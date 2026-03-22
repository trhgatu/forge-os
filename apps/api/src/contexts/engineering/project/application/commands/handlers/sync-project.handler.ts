import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import { SyncProjectCommand } from '../sync-project.command';
import { ProjectRepository } from '../../ports/project.repository';
import { GithubRepository } from '../../ports/github.repository';
import { Project } from '../../../domain/entities/project.entity';
import { LoggerService } from '@shared/logging/logger.service';
import { ACTIVITY_STREAM_PORT, IActivityStreamPort } from '@shared/ports/activity-stream.port';
import { CacheService } from '@shared/services';

@CommandHandler(SyncProjectCommand)
export class SyncProjectHandler implements ICommandHandler<SyncProjectCommand> {
  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
    @Inject(ACTIVITY_STREAM_PORT)
    private readonly activityStream: IActivityStreamPort,
    private readonly logger: LoggerService,
    private readonly cacheService: CacheService,
  ) {}

  async execute(command: SyncProjectCommand): Promise<Project> {
    const { payload } = command;
    const userId = payload.userId;
    const project = await this.projectRepository.findById(payload.id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${payload.id} not found`);
    }

    const githubInfo = project.extractGithubInfo();

    if (!githubInfo) {
      this.logger.warn(`Project ${payload.id} has no GitHub info to sync`);
      return project;
    }

    const { owner, repo } = githubInfo;
    this.logger.log(`Syncing project ${payload.id} with GitHub ${owner}/${repo}`);

    try {
      const repoDetails = await this.githubRepository.getRepoDetails(owner, repo);

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

      const newCommitCount = repoDetails.recentCommits?.length || 0;
      project.addLog({
        date: new Date(),
        type: 'update',
        content: `Synced with GitHub. Fetched ${newCommitCount} recent commits and updated stats.`,
      });
      await this.projectRepository.save(project);
      await this.cacheService.deleteByPattern('projects:*');

      await this.activityStream.emit('engineering.project.synced', userId, {
        id: payload.id.toString(),
        owner,
        repo,
        commitCount: newCommitCount,
      });

      this.logger.log(
        `Project synced and streamed: "${project.title}" (ID: ${payload.id.toString()}) with GitHub ${owner}/${repo}`,
      );
      return project;
    } catch (error: any) {
      this.logger.error(`Failed to sync project ${payload.id}`, (error as Error).stack);

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
