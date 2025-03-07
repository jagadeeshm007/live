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

export const getBlogPosts = (): BlogPost[] => {
  const blogPosts = Object.entries(blogModules).map(([path, module]) => {
    const id = path.split('/').pop()?.replace(/\.json$/, '') || '';
    return {
      id,
      ...(module as any),
    };
  });

  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getBlogPost = (id: string): BlogPost | undefined => {
  const path = `../data/blogs/${id}.json`;
  const module = blogModules[path];
  
  if (!module) {
    return undefined;
  }

  return {
    id,
    ...(module as any),
  };
}; 