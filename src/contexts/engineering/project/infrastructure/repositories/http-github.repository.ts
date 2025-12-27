import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Octokit } from '@octokit/rest';
import { GithubRepository } from '../../application/ports/github.repository';
import {
  GithubRepoDetails,
  GithubCommitActivity,
} from '../../domain/project.interfaces';

@Injectable()
export class HttpGithubRepository implements GithubRepository, OnModuleInit {
  private octokit!: Octokit;
  private readonly logger = new Logger(HttpGithubRepository.name);

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (!token) {
      this.logger.warn('GITHUB_TOKEN not found in configuration');
    }

    try {
      // Dynamic import to handle ESM module in CommonJS environment
      // Using eval to bypass TypeScript transpilation of dynamic imports to require()
      const { Octokit } = await (eval('import("@octokit/rest")') as Promise<
        typeof import('@octokit/rest')
      >);

      this.octokit = new Octokit({
        auth: token,
      });
    } catch (error) {
      this.logger.error('Failed to load @octokit/rest module', error);
      throw error;
    }
  }

  async getRepoDetails(
    owner: string,
    repo: string,
  ): Promise<GithubRepoDetails> {
    try {
      const { data } = await this.octokit.repos.get({
        owner,
        repo,
      });

      const { data: languages } = await this.octokit.repos.listLanguages({
        owner,
        repo,
      });

      let commitActivity: { date: string; count: number }[] = [];
      try {
        const stats = await this.octokit.repos.getCommitActivityStats({
          owner,
          repo,
        });

        if (Array.isArray(stats.data)) {
          commitActivity = stats.data.flatMap((week: any) =>
            week.days
              .map((count: number, i: number) => {
                if (count === 0) return null;
                const date = new Date(week.week * 1000);
                date.setDate(date.getDate() + i);
                return { date: date.toISOString(), count };
              })
              .filter(
                (item: any): item is { date: string; count: number } =>
                  item !== null,
              ),
          );
        }
      } catch (e: any) {
        this.logger.warn(
          `Failed to fetch commit activity for ${owner}/${repo}: ${e.message}`,
        );
      }

      const recentCommits = await this.getCommitActivity(owner, repo);
      const contributors = await this.getContributors(owner, repo);

      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        language: data.language,
        languages: languages as Record<string, number>,
        commitActivity,
        recentCommits,
        contributors,
        updatedAt: new Date(data.updated_at),
        description: data.description,
      };
    } catch (error) {
      this.logger.error(
        `Failed to fetch repo details for ${owner}/${repo}`,
        error,
      );
      throw error;
    }
  }

  async getCommitActivity(
    owner: string,
    repo: string,
  ): Promise<GithubCommitActivity[]> {
    try {
      const { data } = await this.octokit.repos.listCommits({
        owner,
        repo,
        per_page: 100,
      });

      return data.map((commit) => ({
        date: commit.commit.author?.date,
        message: commit.commit.message,
        author: commit.commit.author?.name,
        url: commit.html_url,
      }));
    } catch (error: any) {
      this.logger.warn(
        `Could not fetch commits for ${owner}/${repo}: ${error.message}`,
      );
      return [];
    }
  }

  async getContributors(
    owner: string,
    repo: string,
  ): Promise<
    {
      login: string;
      avatar_url: string;
      contributions: number;
      html_url: string;
    }[]
  > {
    try {
      const { data } = await this.octokit.repos.listContributors({
        owner,
        repo,
        per_page: 10,
      });

      return data.map((c) => ({
        login: c.login || 'Unknown',
        avatar_url: c.avatar_url || '',
        contributions: c.contributions,
        html_url: c.html_url || '',
      }));
    } catch (error: any) {
      this.logger.warn(
        `Could not fetch contributors for ${owner}/${repo}: ${error.message}`,
      );
      return [];
    }
  }
}
