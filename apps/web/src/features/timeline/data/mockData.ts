import { MoodType } from '@forge/reflection';

import type { TimelineItem } from '@/shared/types';

export const MOCK_TIMELINE: TimelineItem[] = [
  {
    id: '1',
    type: 'milestone',
    date: new Date(),
    title: 'Project Genesis Launch',
    content: 'Deployed the first version of the core architecture. Systems are stable.',
    mood: MoodType.INSPIRED,
    tags: ['Work', 'Achievement'],
  },
  {
    id: '2',
    type: 'mood',
    date: new Date(Date.now() - 1000 * 60 * 60 * 4),
    title: 'Mid-day Pulse',
    content: 'Feeling a bit drained but mentally clear.',
    mood: MoodType.TIRED,
    tags: ['Health'],
  },
  {
    id: '3',
    type: 'journal',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    title: 'The Architecture of Silence',
    content:
      "Today I realized that noise isn't just sound. It's visual clutter, it's unread notifications...",
    mood: MoodType.CALM,
    tags: ['Philosophy', 'Design'],
  },
  {
    id: '4',
    type: 'quote',
    date: new Date(Date.now() - 1000 * 60 * 60 * 48),
    title: 'Daily Stoic',
    content: '"Waste no more time arguing what a good man should be. Be one."',
    mood: MoodType.FOCUSED,
    tags: ['Stoicism', 'Marcus Aurelius'],
    metadata: { author: 'Marcus Aurelius' },
  },
  {
    id: '5',
    type: 'memory',
    date: new Date('2023-11-15'),
    title: 'The Summit at Dawn',
    content:
      'Reached the peak just as the sun broke the horizon. The physical exhaustion vanished instantly.',
    mood: MoodType.INSPIRED,
    tags: ['Nature', 'Travel'],
    imageUrl:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
  },
];


