export function createSkillRuntimeId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}:${crypto.randomUUID()}`;
  }

  return `${prefix}:${Date.now()}:${Math.random().toString(36).slice(2, 10)}`;
}

export type SkillRuntimeRoundIdentity = {
  sessionId: string;
  roundId: string;
  roundAttempt: number;
  roundStartedAt: number | null;
};
