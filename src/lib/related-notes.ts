/** Same-language related essays, keyed by bare slug (no `de/` prefix). */
export const RELATED_NOTES: Record<string, readonly [string, string, string]> = {
  'sovereign-breathing': [
    'physiology-of-future-anxiety',
    'who-am-i-when-im-not-what-i-do',
    'the-simplicity-problem',
  ],
  'why-wellness-culture-is-exhausting-you': [
    'the-simplicity-problem',
    'the-breathline',
    'vagus-nerve-mechanism',
  ],
  'physiology-of-future-anxiety': [
    'sovereign-breathing',
    'vagus-nerve-mechanism',
    'nervous-system-regulation-professionals',
  ],
  'the-simplicity-problem': [
    'why-wellness-culture-is-exhausting-you',
    'vagus-nerve-mechanism',
    'the-breathline',
  ],
  'vagus-nerve-mechanism': [
    'nervous-system-regulation-professionals',
    'physiology-of-future-anxiety',
    'triadic-breath-hexagonal-grid',
  ],
  'the-breathline': [
    'triadic-breath-hexagonal-grid',
    'vagus-nerve-mechanism',
    'the-simplicity-problem',
  ],
  'nervous-system-regulation-professionals': [
    'vagus-nerve-mechanism',
    'parents-guide-coherence-baseline',
    'physiology-of-future-anxiety',
  ],
  'who-am-i-when-im-not-what-i-do': [
    'sovereign-breathing',
    'the-breathline',
    'physiology-of-future-anxiety',
  ],
  'parents-guide-coherence-baseline': [
    'nervous-system-regulation-professionals',
    'vagus-nerve-mechanism',
    'the-simplicity-problem',
  ],
  'triadic-breath-hexagonal-grid': [
    'the-breathline',
    'vagus-nerve-mechanism',
    'the-simplicity-problem',
  ],
};

export function bareNoteSlug(id: string): string {
  return id.replace(/^de\//, '');
}
