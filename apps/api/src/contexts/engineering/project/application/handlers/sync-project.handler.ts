import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SyncProjectCommand } from '../commands/sync-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { GithubRepository } from '../ports/github.repository';
import { ProjectLink } from '../../domain/project.interfaces';
import { Project } from '../../domain/project.entity';
import { LoggerService } from '@shared/logging/logger.service';
import { ProjectSyncedEvent } from '../../domain/events/project-synced.event';
import { CacheService } from '@shared/services';
// import { ProjectResponse } from '../../presentation/dto/project.response';

@CommandHandler(SyncProjectCommand)
export class SyncProjectHandler implements ICommandHandler<SyncProjectCommand> {
  // private readonly logger = new Logger(SyncProjectHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
    private readonly logger: LoggerService,
    private readonly eventBus: EventBus,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: SyncProjectCommand): Promise<Project> {
    const { id } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Extract owner/repo from metadata or links
    let owner: string | undefined;
    let repo: string | undefined;

    const githubLink = project.links?.find((l: ProjectLink) => l.url?.includes('github.com'));
    if (githubLink) {
      const parts = githubLink.url.split('github.com/');
      if (parts[1]) {
        const [o, r] = parts[1].split('/');
        owner = o;
        repo = r?.replace(/\.git$/, '');
      }
    }

    if (!owner || !repo) {
      owner = project.metadata?.owner as string;
      repo = project.metadata?.repo as string;
    }

    if (!owner || !repo) {
      this.logger.warn(`Project ${id} has no GitHub info to sync`);
      return project;
    }

    this.logger.log(`Syncing project ${id} with GitHub ${owner}/${repo}`);

    try {
      const repoDetails = await this.githubRepository.getRepoDetails(owner, repo);

      // Update Project Entity via public method
      project.updateInfo({
        githubStats: {
          stars: repoDetails.stars,
          forks: repoDetails.forks,
          issues: repoDetails.issues,
          language: repoDetails.language,
          languages: repoDetails.languages,
          commitActivity: repoDetails.commitActivity,
          recentCommits: repoDetails.recentCommits,
          contributors: repoDetails.contributors,
          updatedAt: repoDetails.updatedAt,
          readme: repoDetails.readme,
          issuesList: repoDetails.issuesList,
          pullRequests: repoDetails.pullRequests,
        },
        metadata: {
          ...project.metadata,
          owner,
          repo,
          syncedAt: new Date(),
        },
      });

      // Add System Log
      const newCommitCount = repoDetails.recentCommits?.length || 0;
      project.addLog({
        date: new Date(),
        type: 'update',
        content: `Synced with GitHub. Fetched ${newCommitCount} recent commits and updated stats.`,
      });

      // Save
      await this.projectRepository.save(project);

      // Invalidate Cache
      await this.cacheService.deleteByPattern('projects:*');

      this.eventBus.publish(
        new ProjectSyncedEvent(
          id.toString(),
          'system', // TODO: Pass real userId from command
          repoDetails,
          newCommitCount,
          new Date(),
        ),
      );

      this.logger.log(`Project ${id} synced successfully`);
      return project;
    } catch (error: any) {
      this.logger.error(`Failed to sync project ${id}`, (error as Error).stack); // Type cast for safety

      if (error.status === 404) {
        this.logger.warn(`GitHub Repo ${owner}/${repo} not found. Clearing invalid metadata.`);

        if (project.metadata) {
          const newMetadata = { ...project.metadata };
          delete newMetadata.owner;
          delete newMetadata.repo;

          project.updateInfo({ metadata: newMetadata });
          await this.projectRepository.save(project);

          await this.cacheService.deleteByPattern('projects:*');
        }

        throw new NotFoundException(
          `GitHub repository ${owner}/${repo} not found. Please check your project links.`,
        );
      }
      throw error;
    }
  }
}
