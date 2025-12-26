import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';
import { GithubRepository } from '../../application/ports/github.repository';
import {
  GithubRepoDetails,
  GithubCommitActivity,
} from '../../domain/project.interfaces';

@Injectable()
export class HttpGithubRepository implements GithubRepository {
  private readonly octokit: Octokit;
  private readonly logger = new Logger(HttpGithubRepository.name);

  constructor(private readonly configService: ConfigService) {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (!token) {
      this.logger.warn('GITHUB_TOKEN not found in configuration');
    }

    this.octokit = new Octokit({
      auth: token,
    });
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

      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        language: data.language,
        languages: languages as Record<string, number>,
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
}
