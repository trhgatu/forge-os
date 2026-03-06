import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Octokit } from '@octokit/rest';
import { GithubRepository } from '../../application/ports/github.repository';
import { LoggerService } from '@shared/logging/logger.service';
import {
  GithubCommitActivity,
  GithubContributionStats,
  GithubIssue,
  GithubPullRequest,
  GithubRepo,
  GithubRepoDetails,
} from '../../domain/project.interfaces';

const GITHUB_CONTRIBUTION_QUERY = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

@Injectable()
export class HttpGithubRepository implements GithubRepository, OnModuleInit {
  private octokit!: Octokit;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  async onModuleInit() {
    const token = this.configService.get<string>('GITHUB_TOKEN');
    if (!token) {
      this.logger.warn('GITHUB_TOKEN not found in configuration');
    }

    try {
      // Workaround: Use eval() to prevent TypeScript from transpiling dynamic import to require() in CommonJS
      const { Octokit } = await eval('import("@octokit/rest")');
      this.octokit = new Octokit({ auth: token });
    } catch (error) {
      this.logger.error('Failed to load @octokit/rest module', error);
      throw error;
    }
  }

  async getRepoDetails(owner: string, repo: string): Promise<GithubRepoDetails> {
    try {
      const [{ data }, { data: languages }] = await Promise.all([
        this.octokit.repos.get({ owner, repo }),
        this.octokit.repos.listLanguages({ owner, repo }),
      ]);
      const [
        commitActivityResult,
        recentCommitsResult,
        contributorsResult,
        issuesResult,
        pullRequestsResult,
        readmeResult,
      ] = await Promise.allSettled([
        this.fetchCommitActivityStats(owner, repo),
        this.getCommitActivity(owner, repo),
        this.getContributors(owner, repo),
        this.fetchIssues(owner, repo),
        this.fetchPullRequests(owner, repo),
        this.fetchReadme(owner, repo),
      ]);

      return {
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        language: data.language,
        languages: languages as Record<string, number>,
        updatedAt: new Date(data.updated_at),
        description: data.description,
        commitActivity: this.unwrap(commitActivityResult, [], `commitActivity ${owner}/${repo}`),
        recentCommits: this.unwrap(recentCommitsResult, [], `recentCommits ${owner}/${repo}`),
        contributors: this.unwrap(contributorsResult, [], `contributors ${owner}/${repo}`),
        issuesList: this.unwrap(issuesResult, [], `issues ${owner}/${repo}`),
        pullRequests: this.unwrap(pullRequestsResult, [], `pullRequests ${owner}/${repo}`),
        readme: this.unwrap(readmeResult, null, `readme ${owner}/${repo}`),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch repo details for ${owner}/${repo}`, error);
      throw error;
    }
  }

  private unwrap<T>(result: PromiseSettledResult<T>, fallback: T, label: string): T {
    if (result.status === 'fulfilled') return result.value;
    this.logger.warn(`[GithubRepository] Non-fatal failure: ${label} — ${String(result.reason)}`);
    return fallback;
  }

  private async fetchCommitActivityStats(
    owner: string,
    repo: string,
  ): Promise<{ date: string; count: number }[]> {
    const stats = await this.octokit.repos.getCommitActivityStats({ owner, repo });
    if (!Array.isArray(stats.data)) return [];
    return stats.data.flatMap((week: any) =>
      week.days
        .map((count: number, i: number) => {
          if (count === 0) return null;
          const date = new Date(week.week * 1000);
          date.setDate(date.getDate() + i);
          return { date: date.toISOString(), count };
        })
        .filter((item: any): item is { date: string; count: number } => item !== null),
    );
  }

  private async fetchIssues(owner: string, repo: string): Promise<GithubIssue[]> {
    const { data } = await this.octokit.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: 20,
    });
    return data
      .filter((issue) => !issue.pull_request)
      .map((issue) => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state,
        html_url: issue.html_url,
        labels: issue.labels.map((l) =>
          typeof l === 'string'
            ? { name: l, color: 'bdd2e1' }
            : { name: l.name || 'unknown', color: l.color || 'bdd2e1' },
        ),
        assignee: issue.assignee
          ? { login: issue.assignee.login, avatar_url: issue.assignee.avatar_url }
          : null,
        created_at: issue.created_at,
      }));
  }

  private async fetchPullRequests(owner: string, repo: string): Promise<GithubPullRequest[]> {
    const { data } = await this.octokit.pulls.list({ owner, repo, state: 'open', per_page: 10 });
    return data.map((pr: any) => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      state: pr.state,
      html_url: pr.html_url,
      user: { login: pr.user?.login || 'unknown', avatar_url: pr.user?.avatar_url || '' },
      created_at: pr.created_at,
    }));
  }

  private async fetchReadme(owner: string, repo: string): Promise<string | null> {
    const { data } = await this.octokit.repos.getReadme({ owner, repo });
    if (!data.content) return null;
    return Buffer.from(data.content, 'base64').toString('utf-8');
  }

  async getCommitActivity(owner: string, repo: string): Promise<GithubCommitActivity[]> {
    try {
      const { data } = await this.octokit.repos.listCommits({ owner, repo, per_page: 100 });
      return data.map((commit) => ({
        date: commit.commit.author?.date,
        message: commit.commit.message,
        author: commit.commit.author?.name,
        url: commit.html_url,
      }));
    } catch (error: any) {
      this.logger.warn(`Could not fetch commits for ${owner}/${repo}: ${error.message}`);
      return [];
    }
  }

  async getContributors(
    owner: string,
    repo: string,
  ): Promise<{ login: string; avatar_url: string; contributions: number; html_url: string }[]> {
    try {
      const { data } = await this.octokit.repos.listContributors({ owner, repo, per_page: 10 });
      return data.map((c) => ({
        login: c.login || 'Unknown',
        avatar_url: c.avatar_url || '',
        contributions: c.contributions,
        html_url: c.html_url || '',
      }));
    } catch (error: any) {
      this.logger.warn(`Could not fetch contributors for ${owner}/${repo}: ${error.message}`);
      return [];
    }
  }

  async getUserContributionStats(username: string): Promise<GithubContributionStats> {
    try {
      const response: any = await this.octokit.request('POST /graphql', {
        query: GITHUB_CONTRIBUTION_QUERY,
        variables: { login: username },
      });

      if (!response.data?.data?.user) {
        throw new Error('User not found in GraphQL response');
      }

      const calendar = response.data.data.user.contributionsCollection.contributionCalendar;
      return {
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks,
      };
    } catch (error: any) {
      this.logger.error(
        `Failed to fetch contribution stats for ${username}: ${error.message}`,
        error,
      );
      return { totalContributions: 0, weeks: [] };
    }
  }

  async getUserRepos(username: string): Promise<GithubRepo[]> {
    try {
      const { data } = await this.octokit.repos.listForUser({
        username,
        sort: 'updated',
        per_page: 50,
      });
      return data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stars: repo.stargazers_count || 0,
        language: repo.language || null,
        updated_at: repo.updated_at || new Date().toISOString(),
      }));
    } catch (error: any) {
      this.logger.warn(`Failed to fetch repos for ${username}: ${error.message}`);
      return [];
    }
  }
}
