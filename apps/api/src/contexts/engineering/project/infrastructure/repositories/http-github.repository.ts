import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Octokit } from '@octokit/rest';
import { GithubRepository } from '../../application/ports/github.repository';
import {
  GithubCommitActivity,
  GithubContributionStats,
  GithubIssue,
  GithubPullRequest,
  GithubRepo,
  GithubRepoDetails,
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

  async getRepoDetails(owner: string, repo: string): Promise<GithubRepoDetails> {
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
              .filter((item: any): item is { date: string; count: number } => item !== null),
          );
        }
      } catch (e: any) {
        this.logger.warn(`Failed to fetch commit activity for ${owner} / ${repo}: ${e.message} `);
      }

      const recentCommits = await this.getCommitActivity(owner, repo);
      const contributors = await this.getContributors(owner, repo);

      // Fetch Issues (open)
      let issuesList: GithubIssue[] = [];
      try {
        const { data: issuesData } = await this.octokit.issues.listForRepo({
          owner,
          repo,
          state: 'open',
          per_page: 20,
        });
        // Filter out PRs (GitHub API returns PRs as issues)
        issuesList = issuesData
          .filter((issue) => !issue.pull_request)
          .map((issue) => ({
            id: issue.id,
            number: issue.number,
            title: issue.title,
            state: issue.state,
            html_url: issue.html_url,
            labels: issue.labels.map((l) => {
              if (typeof l === 'string') {
                return { name: l, color: 'bdd2e1' };
              }
              return {
                name: l.name || 'unknown',
                color: l.color || 'bdd2e1',
              };
            }),
            assignee: issue.assignee
              ? {
                  login: issue.assignee.login,
                  avatar_url: issue.assignee.avatar_url,
                }
              : null,
            created_at: issue.created_at,
          }));
      } catch (error) {
        this.logger.warn(`Failed to fetch issues for ${owner}/${repo}`, error);
      }

      // Fetch Pull Requests (open)
      let pullRequests: GithubPullRequest[] = [];
      try {
        const { data: prsData } = await this.octokit.pulls.list({
          owner,
          repo,
          state: 'open',
          per_page: 10,
        });
        pullRequests = prsData.map((pr: any) => ({
          id: pr.id,
          number: pr.number,
          title: pr.title,
          state: pr.state,
          html_url: pr.html_url,
          user: {
            login: pr.user?.login || 'unknown',
            avatar_url: pr.user?.avatar_url || '',
          },
          created_at: pr.created_at,
        }));
      } catch (error) {
        this.logger.warn(`Failed to fetch PRs for ${owner}/${repo}`, error);
      }

      let readme: string | null = null;
      try {
        const { data: readmeData } = await this.octokit.repos.getReadme({
          owner,
          repo,
        });
        if (readmeData.content) {
          readme = Buffer.from(readmeData.content, 'base64').toString('utf-8');
        }
      } catch (error) {
        this.logger.warn(`No README found for ${owner}/${repo}`, error);
      }

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
        readme,
        issuesList,
        pullRequests,
      };
    } catch (error) {
      this.logger.error(`Failed to fetch repo details for ${owner} / ${repo}`, error);
      throw error;
    }
  }

  async getCommitActivity(owner: string, repo: string): Promise<GithubCommitActivity[]> {
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
      this.logger.warn(`Could not fetch commits for ${owner} / ${repo}: ${error.message} `);
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
      this.logger.warn(`Could not fetch contributors for ${owner} / ${repo}: ${error.message} `);
      return [];
    }
  }

  async getUserContributionStats(username: string): Promise<GithubContributionStats> {
    try {
      const query = `
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

      const response: any = await this.octokit.request('POST /graphql', {
        query,
        variables: {
          login: username,
        },
      });

      // Octokit response structure for GraphQL usually puts the payload in `data` (if successful), or `data.data`?
      // Actually `octokit.request` returns `{ status, url, headers, data }`.
      // The GraphQL response body is in `response.data`.
      // If GraphQL succeeded, `response.data` has `{ data: { user: ... } }`.

      this.logger.log(`GraphQL Response for ${username}: ${JSON.stringify(response.data)}`);

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
        `Failed to fetch contribution stats for user ${username}: ${error.message}`,
        error,
      );
      // Return empty stats on error
      return {
        totalContributions: 0,
        weeks: [],
      };
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
      this.logger.warn(`Failed to fetch repos for user ${username}: ${error.message}`);
      return [];
    }
  }
}
