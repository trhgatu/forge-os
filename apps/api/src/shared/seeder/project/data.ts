export const projects = [
  {
    title: 'Forge OS System',
    description: 'The personal operating system for productivity and reflection.',
    status: 'active',
    tags: ['React', 'Next.js', 'System Architecture'],
    isPinned: true,
    githubStats: {},
    metadata: { owner: 'forge-os', repo: 'forge-os-fullstack' },
    progress: 78,
    taskBoard: {
      todo: [{ id: 't1', title: 'Implement search', priority: 'medium' }],
      inProgress: [{ id: 't3', title: 'Refactor context', priority: 'high' }],
      done: [{ id: 't4', title: 'Init project', priority: 'low' }],
    },
    links: [
      {
        title: 'Repo',
        url: 'https://github.com/forge-os/forge-os-fullstack',
        icon: 'github',
      },
    ],
  },
  {
    title: 'Neural Core Alpha',
    description: 'Experimental AI orchestration layer.',
    status: 'active',
    tags: ['AI', 'Python', 'Embeddings'],
    isPinned: false,
    githubStats: {},
    metadata: { owner: 'nestjs', repo: 'nest' },
    progress: 42,
    taskBoard: { todo: [], inProgress: [], done: [] },
    links: [],
  },
];
