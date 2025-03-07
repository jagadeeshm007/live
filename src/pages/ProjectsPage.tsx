import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getProjects, Project } from '../utils/projectData';
import { ScrollToTop } from '../components/ScrollToTop';

const ProjectsPageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 6rem 2rem 4rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 4rem 1.5rem 3rem;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem 2rem;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 3rem;
  position: relative;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
  background: rgb(0, 0, 0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const PageDescription = styled.p`
  font-size: 1.1rem;
  color: #666666;
  max-width: 600px;
  font-family: 'JetBrains Mono', monospace;

  @media (max-width: 768px) {
    font-size: 1rem;
    max-width: 100%;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  margin-bottom: 3rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 2px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ProjectCard = styled(motion.div)<{ $hoverStyle?: number }>`
  background: #F5F5F5;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$hoverStyle === 1 ? '#000000' : '#FF0000'};
    
    h2 {
      color: ${props => props.$hoverStyle === 1 ? '#FFFFFF' : '#000000'};
    }
  }
`;

const ProjectTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 500;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;

  @media (max-width: 1024px) {
    font-size: 1.25rem;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-family: 'JetBrains Mono', monospace;
  color: #666666;
  font-size: 1.1rem;
`;

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoverStyles, setHoverStyles] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        // Assign alternating hover styles based on index
        const styles = projectsData.reduce((acc, project, index) => ({
          ...acc,
          [project.id]: index % 2 === 0 ? 1 : 2
        }), {});
        setHoverStyles(styles);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [location.pathname]);

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  if (loading) {
    return (
      <ProjectsPageContainer>
        <LoadingContainer>Loading projects...</LoadingContainer>
      </ProjectsPageContainer>
    );
  }

  return (
    <ProjectsPageContainer>
      <ScrollToTop />
      <PageHeader>
        <PageTitle>My Projects</PageTitle>
        <PageDescription>
          A collection of my work showcasing various technologies and solutions
        </PageDescription>
      </PageHeader>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            $hoverStyle={hoverStyles[project.id]}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            onClick={() => handleProjectClick(project.id)}
            whileHover={{ scale: 1.02 }}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsPageContainer>
  );
}; 