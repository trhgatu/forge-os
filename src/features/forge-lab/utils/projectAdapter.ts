import {
  ProjectSummaryResponse,
  GithubStatsResponse,
  ReadmeResponse,
  TaskBoardResponse,
  PaginatedLogsResponse,
} from "../types/dto";
import { Project } from "../types";

/**
 * Adapter to convert DTO responses to legacy Project type
 * Maintains backward compatibility while using new API
 */
export class ProjectAdapter {
  /**
   * Convert ProjectSummaryResponse + lazy loaded data to full Project
   * Ensures 'links' are populated from summary
   */
  static toProject(
    summary: ProjectSummaryResponse,
    githubStats?: GithubStatsResponse,
    readme?: ReadmeResponse,
    taskBoard?: TaskBoardResponse,
    logs?: PaginatedLogsResponse
  ): Project {
    return {
      id: summary.id,
      title: summary.title,
      description: summary.description,
      status: summary.status as "active" | "archived" | "draft" | "completed",
      tags: summary.tags,
      isPinned: summary.isPinned,
      progress: summary.progress,
      updatedAt: new Date(summary.updatedAt),

      // ✅ Correctly map links from summary
      links:
        summary.links?.map((link) => ({
          ...link,
          icon: (link.icon === "github" ? "github" : "link") as "github" | "link" | "figma" | "doc",
        })) || [],

      // GitHub stats (if loaded)
      githubStats: githubStats
        ? {
            stars: summary.stats.stars,
            forks: summary.stats.forks,
            issues: summary.stats.issues,
            language: summary.stats.language,
            languages: githubStats.languages,
            commitActivity: githubStats.commitActivity.map((activity) => ({
              date: activity.week,
              count: activity.commits,
            })),
            recentCommits: githubStats.recentCommits,
            contributors: githubStats.contributors.map((c) => ({
              ...c,
              html_url: `https://github.com/${c.login}`,
            })),
            readme: readme?.content,
            issuesList: githubStats.issuesList.map((issue) => ({
              id: issue.id,
              number: issue.number,
              title: issue.title,
              state: issue.state,
              html_url: issue.html_url,
              labels: [],
              assignee: null,
              created_at: issue.created_at,
            })),
            pullRequests: githubStats.pullRequests,
          }
        : {
            stars: summary.stats.stars,
            forks: summary.stats.forks,
            issues: summary.stats.issues,
            language: summary.stats.language,
          },

      // TaskBoard (if loaded) - cast priority to union type
      taskBoard: taskBoard
        ? {
            todo: taskBoard.todo.map((task) => ({
              id: task.id,
              title: task.title,
              priority: task.priority as "low" | "medium" | "high",
            })),
            inProgress: taskBoard.inProgress.map((task) => ({
              id: task.id,
              title: task.title,
              priority: task.priority as "low" | "medium" | "high",
            })),
            done: taskBoard.done.map((task) => ({
              id: task.id,
              title: task.title,
              priority: task.priority as "low" | "medium" | "high",
            })),
          }
        : { todo: [], inProgress: [], done: [] },

      // Logs (if loaded)
      logs: logs
        ? logs.data.map((log) => ({
            id: log.id,
            content: log.content,
            date: new Date(log.date),
            type: log.type as "update" | "milestone" | "issue" | "alert",
          }))
        : [],

      // Default values and casting for other fields
      technologies: [],
    };
  }
}
