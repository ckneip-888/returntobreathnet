import type { Lang } from './types';

export function withLang(lang: Lang, path: string): string {
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const bare = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const p = bare.startsWith('/') ? bare : `/${bare}`;
  const normalized = p === '' ? '/' : p;

  if (lang !== 'de') return `${normalized}${hash}`;
  if (normalized === '/') return `/de/${hash}`;
  return `/de${normalized}${hash}`;
}

export function stripLang(pathname: string): string {
  const stripped = pathname.replace(/^\/de(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export function otherLangHref(pathname: string, target: Lang): string {
  return withLang(target, stripLang(pathname));
}
