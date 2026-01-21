import { parseMarkdownFile } from '../utils/markdownParser';

// Dynamic import of all markdown files in content/posts
const mdFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default', eager: true });

interface BlogPost {
  id: number;
  title: { [key: string]: string };
  date: string;
  readTime: string;
  tag: string;
  content: { [key: string]: string };
}

// Helper to group files by ID (assuming naming convention or ID in frontmatter)
// We will use ID from frontmatter check
const processFiles = () => {
  const postsMap = new Map<number, BlogPost>();

  for (const path in mdFiles) {
    const rawContent = mdFiles[path] as string;
    const { metadata, content } = parseMarkdownFile(rawContent);

    // Determine language from filename (e.g., post.fr.md -> fr)
    const lang = path.endsWith('.fr.md') ? 'fr' : 'en';

    if (!postsMap.has(metadata.id)) {
      postsMap.set(metadata.id, {
        id: metadata.id,
        title: {},
        date: metadata.date,
        readTime: metadata.readTime,
        tag: metadata.tag,
        content: {}
      });
    }

    const post = postsMap.get(metadata.id)!;
    post.title[lang] = metadata.title;
    post.content[lang] = content;

    // Ensure shared metadata is consistent (take from first found or specific logic)
    // Here we assume they match or we overwrite nicely
  }

  return Array.from(postsMap.values())
    .sort((a, b) => b.id - a.id); // Sort by new
};

export const BLOG_CONTENT = processFiles();
