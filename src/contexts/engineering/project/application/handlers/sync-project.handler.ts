import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { SyncProjectCommand } from '../commands/sync-project.command';
import { ProjectRepository } from '../ports/project.repository';
import { GithubRepository } from '../ports/github.repository';
import { ProjectLink } from '../../domain/project.interfaces';
import { Project } from '../../domain/project.entity';

@CommandHandler(SyncProjectCommand)
export class SyncProjectHandler implements ICommandHandler<SyncProjectCommand> {
  private readonly logger = new Logger(SyncProjectHandler.name);

  constructor(
    @Inject('ProjectRepository')
    private readonly projectRepository: ProjectRepository,
    @Inject('GithubRepository')
    private readonly githubRepository: GithubRepository,
  ) {}

  async execute(command: SyncProjectCommand): Promise<Project> {
    const { id } = command;
    const project = await this.projectRepository.findById(id);

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Extract owner/repo from metadata or links
    // Assuming metadata contains { owner: '...', repo: '...' } or we parse it
    // For now, let's look for a github link in links array or metadata

    // 1. Always prioritize the visible GitHub link from the 'links' array as the Source of Truth
    // This fixes the issue where hidden metadata becomes stale or invalid (e.g. from bad seeding)
    let owner: string | undefined;
    let repo: string | undefined;

    const githubLink = project.links?.find((l: ProjectLink) =>
      l.url?.includes('github.com'),
    );
    if (githubLink) {
      const parts = githubLink.url.split('github.com/');
      if (parts[1]) {
        const [o, r] = parts[1].split('/');
        owner = o;
        repo = r?.replace('.git', '');
      }
    }

    // 2. Fallback to existing metadata if no link is found (legacy support)
    if (!owner || !repo) {
      owner = project.metadata?.owner as string;
      repo = project.metadata?.repo as string;
    }

    if (!owner || !repo) {
      this.logger.warn(`Project ${id} has no GitHub info to sync`);
      // Since we promise to return a Project, we should return it even if unchanged/warning
      return project;
    }

    this.logger.log(`Syncing project ${id} with GitHub ${owner}/${repo}`);

    try {
      const repoDetails = await this.githubRepository.getRepoDetails(
        owner,
        repo,
      );

      // Update Project Entity
      project.githubStats = {
        stars: repoDetails.stars,
        forks: repoDetails.forks,
        issues: repoDetails.issues,
        language: repoDetails.language,
        languages: repoDetails.languages,
        commitActivity: repoDetails.commitActivity,
        recentCommits: repoDetails.recentCommits,
        contributors: repoDetails.contributors,
        updatedAt: repoDetails.updatedAt,
      };

      // Update metadata to ensure we have the owner/repo saved if we parsed it
      project.metadata = {
        ...project.metadata,
        owner,
        repo,
        syncedAt: new Date(),
      };

      // Save
      await this.projectRepository.update(project);
      this.logger.log(`Project ${id} synced successfully`);
      return project;
    } catch (error: any) {
      this.logger.error(`Failed to sync project ${id}`, error);

      if (error.status === 404) {
        this.logger.warn(
          `GitHub Repo ${owner}/${repo} not found. Clearing invalid metadata.`,
        );

        // Clear invalid metadata so the user is forced to fix the link or it re-evaluates next time
        if (project.metadata) {
          delete project.metadata.owner;
          delete project.metadata.repo;
          await this.projectRepository.update(project);
        }

        throw new NotFoundException(
          `GitHub repository ${owner}/${repo} not found. Please check your project links.`,
        );
      }
      throw error;
    }
  }
}
