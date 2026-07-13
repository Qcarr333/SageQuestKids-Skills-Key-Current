/**
 * Local preview implementation of the main-project gaming sound effects.
 *
 * In the main Sage Quest Kids project this module is provided by
 * `src/lib/gaming/soundEffects`. Here it is a small WebAudio stand-in so the
 * shared `soundAdapter` contract works without bundled effect files.
 *
 * Tones are intentionally soft and short — no cash-register, coin, or
 * casino-style effects, per Sage Quest Kids safety standards.
 */

let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!audioContext) {
      audioContext = new window.AudioContext();
    }
    if (audioContext.state === 'suspended') {
      void audioContext.resume();
    }
    return audioContext;
  } catch {
    return null;
  }
}

type ToneStep = {
  frequency: number;
  startOffset: number;
  duration: number;
  peak?: number;
  type?: OscillatorType;
};

function playTones(steps: ToneStep[]) {
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;

  for (const step of steps) {
    try {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = now + step.startOffset;
      const end = start + step.duration;
      const peak = step.peak ?? 0.06;

      oscillator.type = step.type ?? 'sine';
      oscillator.frequency.setValueAtTime(step.frequency, start);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(peak, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, end);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(end + 0.05);
    } catch {
      // Fail-soft: audio is never required for gameplay.
    }
  }
}

export function playCorrectSound() {
  playTones([
    { frequency: 660, startOffset: 0, duration: 0.11 },
    { frequency: 880, startOffset: 0.09, duration: 0.14 },
  ]);
}

export function playTryAgainSound() {
  playTones([
    { frequency: 240, startOffset: 0, duration: 0.16, peak: 0.045, type: 'triangle' },
  ]);
}

export function playCompleteSound() {
  playTones([
    { frequency: 523.25, startOffset: 0, duration: 0.14 },
    { frequency: 659.25, startOffset: 0.12, duration: 0.14 },
    { frequency: 783.99, startOffset: 0.24, duration: 0.22 },
  ]);
}
