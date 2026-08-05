/**
 * Utility for triggering haptic feedback on touch devices when interacting with CTAs.
 */

export type HapticPattern = 'light' | 'medium' | 'heavy' | 'selection' | 'success';

export const triggerHaptic = (pattern: HapticPattern = 'light') => {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (pattern) {
      case 'light':
      case 'selection':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'heavy':
        navigator.vibrate(35);
        break;
      case 'success':
        navigator.vibrate([15, 40, 20]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Ignore error if vibration API fails or is restricted by permission policy
  }
};
