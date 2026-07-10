import { XpAwardedData, SystemNotificationData, QueuedToast } from '../types';

export const formatDescriptionWithBuff = (
  sys: SystemNotificationData,
  matchingXp: XpAwardedData
): string => {
  const match = sys.description.match(/"([^"]+)"/);
  const entityName = match ? match[1] : '';

  const buffMatch = matchingXp.reason.match(/\((\d+% Buff)\)/);
  const buffText = buffMatch ? buffMatch[1] : '';

  const baseXp = sys.xp || (sys.type === 'JOURNAL_CREATED' ? 25 : undefined);

  if (baseXp) {
    const buffSuffix = buffText ? ` + ${buffText.replace(' Buff', ' Stamina Buff')}` : '';
    
    if (sys.type === 'QUEST_COMPLETED') {
      return `You've completed the quest "${entityName}"! (Base ${baseXp} XP${buffSuffix})`;
    }
    if (sys.type === 'JOURNAL_CREATED') {
      return `You've successfully saved and sealed "${entityName}"! (Base ${baseXp} XP${buffSuffix})`;
    }
    if (sys.type === 'HABIT_COMPLETED') {
      return `You've checked off "${entityName}"! (Base ${baseXp} XP${buffSuffix})`;
    }
  }

  return sys.description;
};

export const matchNotificationsAndAwards = (
  sysNotifications: SystemNotificationData[],
  xpAwards: XpAwardedData[]
): { pairedToasts: QueuedToast[]; remainingXpAwards: XpAwardedData[] } => {
  const pairedToasts: QueuedToast[] = [];
  const availableXpAwards = [...xpAwards];

  const typeKeywords: Record<string, string[]> = {
    QUEST_COMPLETED: ['quest'],
    HABIT_COMPLETED: ['habit'],
    JOURNAL_CREATED: ['journal', 'reflection'],
  };

  sysNotifications.forEach((sys) => {
    let matchingXp: XpAwardedData | undefined;

    // 1. Try to find match by correlationId first
    let matchingIndex = -1;
    if (sys.correlationId) {
      matchingIndex = availableXpAwards.findIndex((xp) => {
        if (xp.correlationId !== sys.correlationId) return false;

        const cleanReason = xp.reason.toLowerCase();
        const match = sys.description.match(/"([^"]+)"/);
        if (match && cleanReason.includes(match[1].toLowerCase())) {
          return true;
        }

        const keywords = typeKeywords[sys.type] || [];
        return keywords.some((kw) => cleanReason.includes(kw));
      });
    }

    // 2. Fall back to robust text/type match
    if (matchingIndex === -1) {
      matchingIndex = availableXpAwards.findIndex((xp) => {
        const cleanReason = xp.reason.toLowerCase();
        const match = sys.description.match(/"([^"]+)"/);
        if (match && cleanReason.includes(match[1].toLowerCase())) {
          return true;
        }

        const keywords = typeKeywords[sys.type] || [];
        return keywords.some((kw) => cleanReason.includes(kw));
      });
    }

    if (matchingIndex !== -1) {
      matchingXp = availableXpAwards[matchingIndex];
      availableXpAwards.splice(matchingIndex, 1);
      
      const cleanTitle = sys.title.replace(' 🏆', '').replace(' ⚡', '');
      const titleWithXp = `${cleanTitle} (+${matchingXp.xp} XP)`;
      const finalTitle = sys.title.includes('🏆') 
        ? `${titleWithXp} 🏆` 
        : sys.title.includes('⚡') 
          ? `${titleWithXp} ⚡` 
          : titleWithXp;
      
      const finalDescription = formatDescriptionWithBuff(sys, matchingXp);

      pairedToasts.push({
        title: finalTitle,
        description: finalDescription,
        type: sys.type,
        duration: sys.type === 'QUEST_COMPLETED' ? 7000 : 5000,
      });
    } else {
      pairedToasts.push({
        title: sys.title,
        description: sys.description,
        type: sys.type,
        duration: sys.type === 'QUEST_COMPLETED' ? 7000 : 5000,
      });
    }
  });

  return {
    pairedToasts,
    remainingXpAwards: availableXpAwards,
  };
};
