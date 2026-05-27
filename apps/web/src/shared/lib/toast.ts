import { toast } from 'sonner';

export const forgeToast = {
  /**
   * Tier 1: System Telemetry (Gray/Minimal)
   * Used for standard CRUD and system tasks (creating tasks, archiving, saving).
   */
  system: (title: string, description?: string) => {
    toast(title, {
      description,
      style: {
        background: 'rgba(9, 9, 11, 0.95)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#a1a1aa',
        fontFamily: 'monospace',
        fontSize: '11px',
      },
    });
  },

  /**
   * Tier 2: Mind Vector Calibration (Ethereal Cyan)
   * Used for attribute level calibrations (Presence, Discipline, Awareness, Willpower, Consistency).
   */
  calibration: (attribute: string, points: number, description?: string) => {
    toast.success(`${attribute.toUpperCase()} CALIBRATED // +${points}`, {
      description,
      style: {
        background: 'rgba(5, 5, 7, 0.95)',
        border: '1px solid rgba(34, 211, 238, 0.3)',
        color: '#ffffff',
        fontFamily: 'monospace',
        textShadow: '0 0 8px rgba(34, 211, 238, 0.3)',
        fontSize: '11px',
      },
    });
  },

  /**
   * Tier 3: Mythic Breakthrough (Golden Amber)
   * Used for major milestones (Completing Quests, Epic Goals, Level Up).
   */
  breakthrough: (title: string, xp: number, description?: string) => {
    toast.message(`🏆 MYTHIC BREAKTHROUGH // +${xp} XP`, {
      description,
      style: {
        background: 'rgba(12, 10, 9, 0.98)',
        border: '1px solid rgba(251, 191, 36, 0.4)',
        color: '#fef08a',
        fontFamily: 'monospace',
        textShadow: '0 0 12px rgba(251, 191, 36, 0.3)',
        fontSize: '11px',
      },
      duration: 5000,
    });
  },
};
