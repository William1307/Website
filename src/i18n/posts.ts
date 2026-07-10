// Blog collection helpers — the ONLY place that understands the
// "<slug>/index.<lang>.md" entry-id convention. Pages never parse ids themselves.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from './locales';

export interface Post {
  slug: string;                    // folder name → URL segment
  lang: Locale;
  entry: CollectionEntry<'blog'>;
  /** Locales this post also exists in — drives the language toggle on article pages. */
  availableIn: Locale[];
}

function parseId(id: string): { slug: string; lang: Locale } {
  // id looks like "pihole-unbound-dns/index.en" (glob loader strips ".md").
  const [slug, file] = id.split('/');
  const lang = (file?.split('.')[1] ?? 'en') as Locale;
  return { slug: slug!, lang };
}

/** All posts for one locale, newest first. The blog listing is generated from this. */
export async function getPosts(lang: Locale): Promise<Post[]> {
  const entries = await getCollection('blog');
  const bySlug = new Map<string, Locale[]>();
  for (const e of entries) {
    const p = parseId(e.id);
    bySlug.set(p.slug, [...(bySlug.get(p.slug) ?? []), p.lang]);
  }
  return entries
    .filter((e) => parseId(e.id).lang === lang)
    .map((entry) => {
      const { slug } = parseId(entry.id);
      return { slug, lang, entry, availableIn: bySlug.get(slug) ?? [lang] };
    })
    .sort((a, b) => b.entry.data.date.getTime() - a.entry.data.date.getTime());
}
