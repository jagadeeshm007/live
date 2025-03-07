import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { getProjects, Project } from '../utils/projectData';
import { useEffect, useState } from 'react';

const ProjectsHeader = styled.div`
  text-align: left;
  max-width: 1200px;
  padding: 0 2rem;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`;

const ProjectsTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: rgb(0, 0, 0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;
  font-family: 'JetBrains Mono', monospace;
  text-align: left;
  padding-right: 50rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    padding-right: 0;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 0;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 2rem;
  position: relative;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-auto-rows: minmax(250px, auto);
    gap: 0;
    padding: 0 1rem;
    margin-bottom: 2rem;
  }
`;

const ProjectCard = styled(motion.div)<{ $size?: 'small' | 'medium' | 'large' | 'wide' | 'tall'; $color: string }>`
  background: ${props => props.$color};
  overflow: hidden;
  position: relative;
  cursor: pointer;
  color: ${props => props.$color === '#FFFFFF' ? '#000000' : '#FFFFFF'};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: none;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 2rem;
    min-height: 250px;
    background-color: #FF0000;
    border: none;
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
    min-height: 200px;
  }
`;

// const ProjectImage = styled.div`
//   width: 100%;
//   height: 40%;
//   background: #f3f4f6;
//   position: relative;
//   overflow: hidden;
// `;

// const ProjectContent = styled.div`
//   padding: 1.5rem;
//   height: 60%;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   background: #ffffff;
//   transition: all 0.3s ease;
// `;

const ProjectTitle = styled.h3<{ $isWhite?: boolean }>`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.$isWhite ? '#000000' : '#FFFFFF'};
  margin-bottom: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

const ProjectDescription = styled.p<{ $isWhite?: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.$isWhite ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)'};
  line-height: 1.4;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    -webkit-line-clamp: 2;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const TechTag = styled.span<{ $isWhite?: boolean }>`
  background: ${props => props.$isWhite ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.$isWhite ? '#000000' : '#FFFFFF'};
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-family: 'JetBrains Mono', monospace;

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.35rem 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.25rem 0.75rem;
  }
`;

const ViewMoreTile = styled(ProjectCard)`
  background: #000000;
  color: #ffffff;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  text-align: center;
  padding: 2rem;
  position: relative;
  margin-top: 0.1rem;
  z-index: 1;
  grid-area: 3 / 1 / 4 / 3 !important;
  border: none;

  @media (max-width: 768px) {
    grid-area: auto !important;
    min-height: 250px;
    font-size: 1.25rem;
    background: #000000 !important;
  }

  @media (max-width: 480px) {
    min-height: 200px;
    font-size: 1.1rem;
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const ProjectContainer = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  &::before {
    content: '';
    position: absolute;
    top: -0.25rem;
    left: -0.25rem;
    right: -0.25rem;
    bottom: -0.25rem;
    z-index: -1;
  }
`;

// interface ProjectsProps {
//   limit?: number;
// }

// interface GridPosition {
//   gridColumn: string;
//   gridRow: string;
// }

// interface PositionMap {
//   [key: number]: {
//     [key: number]: GridPosition;
//   };
// }

export const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await getProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, []);

  const handleViewMore = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/projects');
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const getTileSize = (index: number): 'small' | 'medium' | 'large' | 'wide' | 'tall' => {
    switch (index) {
      case 0: return 'large'; // First project - large (3x2)
      case 1: return 'tall';  // Second project - tall (1x2)
      case 2: return 'medium'; // Third project - medium (2x1)
      case 3: return 'medium'; // Fourth project - medium (2x1)
      default: return 'small';
    }
  };

  const getGridArea = (index: number, hoveredIndex: number | null): string => {
    // Base positions when nothing is hovered
    const basePositions: Record<number, string> = {
      0: '1 / 1 / 3 / 4',    // Large tile (3x2)
      1: '1 / 4 / 3 / 5',    // Tall tile (1x2)
      2: '1 / 5 / 2 / 7',    // Medium tile top-right (2x1)
      3: '2 / 5 / 3 / 7',    // Medium tile bottom-right (2x1)
    };

    if (hoveredIndex === null) {
      return basePositions[index] || '';
    }

    // Keep hovered tile in its original position but expand it
    if (index === hoveredIndex) {
      switch (index) {
        case 0: return '1 / 1 / 3 / 5';    // Expand right from original position
        case 1: return '1 / 3 / 3 / 6';    // Expand both sides from original position
        case 2: return '1 / 4 / 3 / 7';    // Expand down from original position
        case 3: return '1 / 4 / 3 / 7';    // Expand up from original position
        default: return basePositions[index] || '';
      }
    }

    // Arrange other tiles based on which tile is hovered
    switch (hoveredIndex) {
      case 0: // When main tile is hovered
        switch (index) {
          case 1: return '1 / 5 / 2 / 6';  // Shrink and move right
          case 2: return '1 / 6 / 2 / 7';  // Move far right
          case 3: return '2 / 5 / 3 / 7';  // Stay at bottom right
          default: return basePositions[index] || '';
        }
      
      case 1: // When tall tile is hovered
        switch (index) {
          case 0: return '1 / 1 / 3 / 3';  // Shrink width
          case 2: return '1 / 6 / 2 / 7';  // Move right
          case 3: return '2 / 6 / 3 / 7';  // Move right
          default: return basePositions[index] || '';
        }
      
      case 2: // When top-right tile is hovered
        switch (index) {
          case 0: return '1 / 1 / 3 / 3';  // Shrink width
          case 1: return '1 / 3 / 3 / 4';  // Stay tall but move left
          case 3: return '2 / 3 / 3 / 4';  // Move left and shrink
          default: return basePositions[index] || '';
        }
      
      case 3: // When bottom-right tile is hovered
        switch (index) {
          case 0: return '1 / 1 / 3 / 3';  // Shrink width
          case 1: return '1 / 3 / 3 / 4';  // Stay tall but move left
          case 2: return '1 / 3 / 2 / 4';  // Move left and shrink
          default: return basePositions[index] || '';
        }
      
      default:
        return basePositions[index] || '';
    }
  };

  const getTileColor = (index: number, hoveredIndex: number | null): string => {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      return '#FF0000'; // Always red on mobile for project card
    }

    if (index === hoveredIndex) return '#000000'; // Hovered tile is black
    if (hoveredIndex === null) {
      // Default colors when nothing is hovered
      if (index === 0) return '#000000'; // Main tile is black
      if (index === 1) return '#FF0000'; // Second tile is red
      return '#FFFFFF'; // Other tiles are white
    }
    
    // Colors when something is hovered
    switch (index) {
      case 0: return hoveredIndex === 0 ? '#000000' : '#FF0000';  // Main tile becomes red when not hovered
      case 1: return hoveredIndex === 1 ? '#000000' : '#FF0000';  // Tall tile stays red unless hovered
      default: return '#FFFFFF';  // Other tiles stay white
    }
  };

  const displayedProjects = projects.slice(0, window.innerWidth <= 768 ? 1 : 4); // Show only 1 project on mobile

  const handleMouseEnter = (index: number) => {
    if (!isTransitioning) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isTransitioning) {
      setHoveredIndex(null);
    }
  };

  const handleLayoutComplete = () => {
    setIsTransitioning(false);
  };

  return (
    <AnimatedSection id="projects">
      <ProjectsHeader>
        <ProjectsTitle>WORK & EXPERIENCE</ProjectsTitle>
      </ProjectsHeader>
      <ProjectsGrid>
        {displayedProjects.map((project: Project, index: number) => {
          const tileColor = getTileColor(index, hoveredIndex);
          const isWhite = tileColor === '#FFFFFF';
          const isMobile = window.innerWidth <= 768;

          return (
            <ProjectContainer
              key={project.id}
              layout
              style={{
                gridArea: !isMobile ? getGridArea(index, hoveredIndex) : 'auto',
                zIndex: index === hoveredIndex ? 2 : 1
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 25,
                mass: 1.2,
                layout: { 
                  duration: 0.6,
                  ease: [0.4, 0, 0.2, 1]
                }
              }}
              onLayoutAnimationStart={() => setIsTransitioning(true)}
              onLayoutAnimationComplete={handleLayoutComplete}
              onHoverStart={() => !isMobile && handleMouseEnter(index)}
              onHoverEnd={() => !isMobile && handleMouseLeave()}
            >
              <ProjectCard
                $size={getTileSize(index)}
                $color={tileColor}
                style={{
                  height: '100%',
                  width: '100%',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: index === hoveredIndex && !isMobile
                    ? '0 20px 50px rgba(0, 0, 0, 0.25)' 
                    : '0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
                onClick={() => handleProjectClick(project.id)}
              >
                <div>
                  <ProjectTitle $isWhite={isWhite}>{project.title}</ProjectTitle>
                  <ProjectDescription $isWhite={isWhite}>{project.description}</ProjectDescription>
                </div>
                <TechStack>
                  {project.technologies.slice(0, 3).map((tech: string, index: number) => (
                    <TechTag key={index} $isWhite={isWhite}>{tech}</TechTag>
                  ))}
                </TechStack>
              </ProjectCard>
            </ProjectContainer>
          );
        })}
        <motion.div
          initial={false}
          style={{ gridArea: window.innerWidth > 768 ? '3 / 1 / 4 / 3' : 'auto' }}
          whileHover={{ 
            y: -4,
            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
          }}
        >
          <ViewMoreTile
            key="viewMore"
            $size="medium"
            $color="#000000"
            onClick={handleViewMore}
          >
            View More
          </ViewMoreTile>
        </motion.div>
      </ProjectsGrid>
    </AnimatedSection>
  );
}; 