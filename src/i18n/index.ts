import { de } from './de';
import { en } from './en';
import type { Lang } from './types';

export type { Lang };

const dictionaries = { en, de } as const;

export function copy(lang: Lang = 'en') {
  return dictionaries[lang] ?? en;
}
