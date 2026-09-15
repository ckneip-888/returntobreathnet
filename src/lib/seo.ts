export const SITE_URL = 'https://returntobreath.net';
export const BRAND_LINE = 'Return - a quiet breathing companion';
export const TITLE_SUFFIX = ' - Return';
export const OG_IMAGE_PATH = '/images/og-default.png';
export const OG_IMAGE_ABSOLUTE = `${SITE_URL}${OG_IMAGE_PATH}`;

/** Document title with the single marketing suffix. Homepage may pass BRAND_LINE as-is. */
export function withReturnSuffix(lead: string): string {
  const title = lead.trim();
  if (title === BRAND_LINE) return title;
  if (title.endsWith(TITLE_SUFFIX)) return title;
  return `${title.replace(/\s+[—–-]\s+Return(?:\s+App)?$/u, '')}${TITLE_SUFFIX}`;
}
