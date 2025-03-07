import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getProject, Project } from '../utils/projectData';
import { ScrollToTop } from '../components/ScrollToTop';
import ReactMarkdown from 'react-markdown';
const ProjectDetailContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'JetBrains Mono', monospace;
  padding-top: 5rem;
`;

const ProjectInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 5rem);
`;

const HeaderContainer = styled.div`
  width: 100%;
  background: #F5F5F5;
  padding: 3rem 5%;
`;

const ProjectHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const ProjectTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

// const ProjectMeta = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 2rem;
//   color: #6b7280;
//   font-size: 1.1rem;
//   margin-bottom: 2rem;
// `;

// const ProjectImage = styled.div`
//   width: 100%;
//   height: 500px;
//   background-size: cover;
//   background-position: center;
//   border-radius: 12px;
//   margin-bottom: 3rem;
//   box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

const ProjectContent = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2px;
  flex: 1;

  @media (max-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div`
  background: #F5F5F5;
  padding: 3rem 5%;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem 5%;
  }
`;

const MainContentInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  background: #F5F5F5;
  padding: 3rem 2rem;
  height: 100%;
  position: sticky;
  top: 5rem;

  @media (max-width: 768px) {
    padding: 2rem 5%;
    position: relative;
    top: 0;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #000000;
    font-family: 'JetBrains Mono', monospace;
  }
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Tag = styled.span`
  background: #000000;
  color: #FFFFFF;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;

  &:hover {
    background: #333333;
    transform: translateY(-1px);
  }
`;

const CategoryTag = styled(Tag)`
  background: #FF0000;
  color: #FFFFFF;

  &:hover {
    background: #CC0000;
  }
`;

// const LinkButton = styled(motion.a)`
//   display: inline-block;
//   background: #000000;
//   color: #ffffff;
//   padding: 0.75rem 1.5rem;
//   border-radius: 8px;
//   text-decoration: none;
//   font-weight: 500;
//   margin-bottom: 1rem;
//   transition: all 0.3s ease;

//   &:hover {
//     background: #333333;
//     transform: translateY(-2px);
//   }
// `;

const BackButtonContainer = styled.div`
  width: 100%;
  background: #F5F5F5;
  padding: 1rem 5%;
`;

const BackButton = styled(motion.button)`
  background: none;
  border: none;
  color: #000000;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;

  &:hover {
    color: #FF0000;
  }
`;

const AuthorDate = styled.div`
  color: #666666;
  font-size: 1rem;
  font-family: 'JetBrains Mono', monospace;
`;

const Section = styled.div`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TextSection = styled.div`
  font-size: 1rem;
  line-height: 1.8;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
`;

const ImageSection = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

const LinkSection = styled(motion.a)`
  display: inline-block;
  background: #000000;
  color: #FFFFFF;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
  transition: all 0.3s ease;

  &:hover {
    background: #FF0000;
    transform: translateY(-2px);
  }
`;

const ErrorContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #F5F5F5;
  padding: 2rem;
  font-family: 'JetBrains Mono', monospace;
`;

const ErrorMessage = styled.div`
  color: #FF0000;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ErrorDescription = styled.div`
  color: #666666;
  font-size: 1rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
`;

export const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!projectId) {
          setError('No project ID provided');
          return;
        }

        console.log('Loading project with ID:', projectId);
        const projectData = await getProject(projectId);
        
        console.log('Project data received:', projectData);
        
        if (!projectData) {
          setError('Project not found');
          return;
        }

        // Validate required fields
        if (!projectData.title && !projectData.header) {
          setError('Project data is missing required fields');
          return;
        }

        setProject(projectData);
      } catch (err) {
        console.error('Error loading project:', err);
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // Loading state
  if (loading) {
    return (
      <ProjectDetailContainer>
        <ErrorContainer>
          <ErrorMessage>Loading project details...</ErrorMessage>
          <ErrorDescription>Please wait while we fetch the project information.</ErrorDescription>
        </ErrorContainer>
      </ProjectDetailContainer>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <ProjectDetailContainer>
        <ErrorContainer>
          <ErrorMessage>Error: {error || 'Project Not Found'}</ErrorMessage>
          <ErrorDescription>
            {error 
              ? 'There was an error loading the project. Please try again later.'
              : 'The project you\'re looking for doesn\'t exist or has been moved.'}
          </ErrorDescription>
          <BackButton
            onClick={() => navigate('/projects')}
            whileHover={{ x: -5 }}
          >
            ← Back to Projects
          </BackButton>
        </ErrorContainer>
      </ProjectDetailContainer>
    );
  }

  // Validate required data
  if (!project.sections || !project.technologies || !project.category) {
    return (
      <ProjectDetailContainer>
        <ErrorContainer>
          <ErrorMessage>Error: Invalid Project Data</ErrorMessage>
          <ErrorDescription>
            The project data is missing required information.
            Required fields: sections, technologies, category
          </ErrorDescription>
          <BackButton
            onClick={() => navigate('/projects')}
            whileHover={{ x: -5 }}
          >
            ← Back to Projects
          </BackButton>
        </ErrorContainer>
      </ProjectDetailContainer>
    );
  }

  return (
    <ProjectDetailContainer>
      <ScrollToTop />
      <ProjectInner>
        <BackButtonContainer>
          <BackButton
            onClick={() => navigate(-1)}
            whileHover={{ x: -5 }}
          >
            ← Back to Projects
          </BackButton>
        </BackButtonContainer>

        <HeaderContainer>
          <ProjectHeader>
            <ProjectTitle>{project.header || project.title}</ProjectTitle>
            <AuthorDate>
              By {project.author} • {new Date(project.date).toLocaleDateString()}
            </AuthorDate>
          </ProjectHeader>
        </HeaderContainer>

        <ProjectContent>
          <MainContent>
            <MainContentInner>
              {project.sections.map((section, index) => (
                <Section key={index}>
                  {section.type === 'text' && (
                    <TextSection><ReactMarkdown>{section.content}</ReactMarkdown></TextSection>
                  )}
                  {section.type === 'image' && (
                    <ImageSection src={section.src} alt={section.alt} />
                  )}
                  {section.type === 'link' && (
                    <LinkSection
                      href={section.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {section.text}
                    </LinkSection>
                  )}
                </Section>
              ))}
            </MainContentInner>
          </MainContent>

          <Sidebar>
            <SidebarSection>
              <h3>Technologies</h3>
              <TagList>
                {project.technologies.map((tech, index) => (
                  <Tag key={index}>{tech}</Tag>
                ))}
              </TagList>
            </SidebarSection>

            <SidebarSection>
              <h3>Categories</h3>
              <TagList>
                {project.category.map((cat, index) => (
                  <CategoryTag key={index}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </CategoryTag>
                ))}
              </TagList>
            </SidebarSection>

            <SidebarSection>
              <h3>Description</h3>
              <TextSection>{project.description}</TextSection>
            </SidebarSection>
          </Sidebar>
        </ProjectContent>
      </ProjectInner>
    </ProjectDetailContainer>
  );
}; 