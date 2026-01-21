
export interface BlogPostMetadata {
    id: number;
    title: string;
    date: string;
    readTime: string;
    tag: string;
}

export interface ParsedMarkdown {
    metadata: BlogPostMetadata;
    content: string;
}

export const parseMarkdownFile = (fileContent: string): ParsedMarkdown => {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    if (!match) {
        throw new Error("No frontmatter found in file");
    }

    const frontmatterBlock = match[1];
    const content = fileContent.replace(frontmatterRegex, '').trim();

    const metadata: any = {};
    frontmatterBlock.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
            let value = valueParts.join(':').trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            // Parse numbers
            if (key.trim() === 'id') {
                metadata[key.trim()] = parseInt(value, 10);
            } else {
                metadata[key.trim()] = value;
            }
        }
    });

    return {
        metadata: metadata as BlogPostMetadata,
        content
    };
};
