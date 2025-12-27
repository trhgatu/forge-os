import {
  GithubRepoDetails,
  GithubCommitActivity,
} from '../../domain/project.interfaces';

export interface GithubRepository {
  getRepoDetails(owner: string, repo: string): Promise<GithubRepoDetails>;
  getCommitActivity(
    owner: string,
    repo: string,
  ): Promise<GithubCommitActivity[]>;
}
