export interface AutomatableAction {
  type: string;
  label: string;
  sublabel: string;
  module: string;
}

export const AUTOMATABLE_ACTIONS_REGISTRY: AutomatableAction[] = [
  {
    type: 'CREATE_JOURNAL',
    label: 'Write Journal Entry',
    sublabel: 'Auto-completes when you save any Journal',
    module: 'reflection',
  },
  {
    type: 'LOG_MOOD',
    label: 'Log Mood Check-in',
    sublabel: 'Auto-completes when you record your daily mood',
    module: 'reflection',
  },
  {
    type: 'COMPLETE_TASK',
    label: 'Complete Any Task',
    sublabel: 'Auto-completes when you complete a task on your board',
    module: 'reflection',
  },
  {
    type: 'CREATE_MEMORY',
    label: 'Forge a Memory',
    sublabel: 'Auto-completes when you save a new alchemical memory',
    module: 'reflection',
  },
  {
    type: 'COMPLETE_HABIT',
    label: 'Check Off a Habit',
    sublabel: 'Auto-completes when you tick a habit manually',
    module: 'reflection',
  },
  {
    type: 'COMPLETE_ROUTINE',
    label: 'Execute a Routine',
    sublabel: 'Auto-completes when you finish a daily workflow routine',
    module: 'reflection',
  },
  {
    type: 'CREATE_TRANSACTION',
    label: 'Log Financial Transaction',
    sublabel: 'Auto-completes when you record an asset flow transaction',
    module: 'wealth',
  },
  {
    type: 'REFLECT_TRANSACTION',
    label: 'Examine Financial Impulse',
    sublabel: 'Auto-completes when you write a Stoic reflection on a transaction',
    module: 'wealth',
  },
  {
    type: 'SYNC_PROJECT',
    label: 'Sync Engineering Activity',
    sublabel: 'Auto-completes when your local development activity is synced',
    module: 'engineering',
  },
];
