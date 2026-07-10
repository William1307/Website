// Locale registry. Every page exists once per locale under /<lang>/…
// French is listed first because it is the site's primary audience;
// the root URL (/) redirects based on the visitor's browser language.
export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'fr';

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function otherLocale(lang: Locale): Locale {
  return lang === 'fr' ? 'en' : 'fr';
}

/** Used by every [lang]/ page's getStaticPaths — one place to change if locales grow. */
export function localeStaticPaths() {
  return LOCALES.map((lang) => ({ params: { lang } }));
}

/** Date formatting is locale-aware everywhere (e.g. "8 décembre 2025" / "December 8, 2025"). */
export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    // Frontmatter dates ("2025-12-08") parse as UTC midnight; format in UTC too,
    // otherwise the build machine's timezone can shift the date by a day.
    timeZone: 'UTC',
  }).format(date);
}
