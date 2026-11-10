export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: string;
  readTime: string;
  content: string;
}

// Import all blog posts
const blogModules = import.meta.glob('../data/blogs/*.json', { eager: true });

type RawPost = Partial<BlogPost> & {
  description?: string;
  technologies?: string[];
  githubUrl?: string;
};

/**
 * Some entries (e.g. docker-guide, leetcode-solutions) use the project shape
 * (description / technologies / githubUrl) instead of the blog shape. Map them
 * onto BlogPost so every page gets the fields it renders.
 */
const normalize = (id: string, raw: RawPost): BlogPost => {
  const excerpt = raw.excerpt ?? raw.description ?? '';
  const repo = raw.githubUrl ? `\n\n[View on GitHub](${raw.githubUrl})` : '';
  return {
    id: raw.id ?? id,
    title: raw.title ?? id,
    date: raw.date ?? '',
    excerpt,
    image: raw.image ?? '',
    tags: raw.tags ?? raw.technologies ?? [],
    author: raw.author ?? 'Jagadeesh Mandala',
    readTime: raw.readTime ?? '',
    content: raw.content ?? `# ${raw.title ?? id}\n\n${excerpt}${repo}`,
  };
};

const toRaw = (module: unknown): RawPost => ((module as { default?: RawPost }).default ?? (module as RawPost));

export const getBlogPosts = (): BlogPost[] => {
  const blogPosts = Object.entries(blogModules).map(([path, module]) => {
    const id = path.split('/').pop()?.replace(/\.json$/, '') || '';
    return normalize(id, toRaw(module));
  });

  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPost = (id: string): BlogPost | undefined => {
  const path = `../data/blogs/${id}.json`;
  const module = blogModules[path];
  
  if (!module) {
    return undefined;
  }

  return normalize(id, toRaw(module));
}; 