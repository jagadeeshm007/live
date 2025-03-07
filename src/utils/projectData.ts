interface ProjectSection {
  type: 'text' | 'image' | 'link';
  content?: string;
  src?: string;
  alt?: string;
  href?: string;
  text?: string;
}

export interface Project {
  id: string;
  title: string;
  author: string;
  date: string;
  header: string;
  description: string;
  technologies: string[];
  category: string[];
  featured: boolean;
  sections: ProjectSection[];
}
// Import all project JSON files
const projectModules = import.meta.glob('../data/projects/*.json', { eager: true });

export const getProjects = (): Project[] => {
  const projects = Object.values(projectModules).map((module: any) => ({
    ...module
  }));

  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getProject = (id: string): Project | undefined => {
  return getProjects().find(project => project.id === id);
}; 