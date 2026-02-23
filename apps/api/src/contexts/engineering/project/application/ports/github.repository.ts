import {
  GithubRepo,
  GithubRepoDetails,
  GithubCommitActivity,
  GithubContributionStats,
} from '../../domain/project.interfaces';

export interface GithubRepository {
  getRepoDetails(owner: string, repo: string): Promise<GithubRepoDetails>;
  getCommitActivity(
    owner: string,
    repo: string,
  ): Promise<GithubCommitActivity[]>;
  getUserContributionStats(username: string): Promise<GithubContributionStats>;
  getUserRepos(username: string): Promise<GithubRepo[]>;
}
