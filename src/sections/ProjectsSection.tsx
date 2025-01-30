import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import { FaGithub, FaExternalLinkAlt, FaReact, FaPython, FaDatabase, FaRocket, FaMobile } from 'react-icons/fa';
import { SiExpo, SiMysql, SiAmazon, SiTensorflow, SiScikitlearn } from 'react-icons/si';
import { useState, useRef, useEffect } from 'react';

const ContentWrapper = styled.div`
  min-height: 50vh;
  width: 100%;
  margin: 0;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
`;

const Title = styled(motion.h2)`
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 2rem;
  color: ${props => props.theme.colors.text};
  text-align: center;
`;

const ProjectGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.div)`
  flex: 0 0 280px;
  height: 420px;
  border-radius: ${props => props.theme.borderRadius};
  perspective: 1000px;
`;

const CardInner = styled(motion.div)<{ isFlipped: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${props => props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)'};
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${props => props.theme.colors.surface};
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: ${props => props.theme.colors.surface};
  transform: rotateY(180deg);
  padding: 1.5rem;
  overflow-y: auto;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 140px;
  object-fit: cover;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

const ProjectContent = styled.div`
  padding: 1rem;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.accent};
    border-radius: 3px;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.text};
`;

interface ProjectDescriptionProps {
  expanded?: boolean;
}

const ProjectDescription = styled.p<ProjectDescriptionProps>`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  position: relative;
  max-height: ${props => props.expanded ? 'none' : '3.2em'};
  overflow: hidden;
  cursor: pointer;
  padding-right: ${props => props.expanded ? '0' : '6rem'};
  
  ${props => !props.expanded && `
    &::after {
      content: '... Read More';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 6rem;
      text-align: right;
      background: linear-gradient(to right, transparent, ${props.theme.colors.surface} 20%);
      padding: 0 0.5rem;
      color: ${props.theme.colors.accent};
      line-height: 1.6;
      height: 1.6em;
    }
  `}
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  padding-top: 0.5rem;
`;

const TechTag = styled.span`
  background: ${props => props.theme.colors.surfaceHover};
  color: ${props => props.theme.colors.accent};
  padding: 0.3rem 0.8rem;
  border-radius: ${props => props.theme.borderRadius};
  font-size: 0.9rem;
`;

const Links = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.surface};
  border-top: 1px solid ${props => props.theme.colors.border};
`;

const GithubButton = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.8rem;
  background: ${props => props.theme.colors.surfaceHover};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
    color: white;
  }
`;

interface ProjectsSectionProps {
  id: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ id }) => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const projects = [
    {
      title: 'LP Rail App',
      description: 'Internal tool for LP Rail Products to streamline payment workflows and transaction management. Built with React Native and Expo, featuring secure financial operations and transaction records.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Payment/Finance related image
      techStack: ['React Native', 'Expo', 'MySQL', 'AWS S3'],
      techIcons: [<FaReact />, <SiExpo />, <SiMysql />, <SiAmazon />],
      githubUrl: 'https://github.com/jagadeeshm007/LP_Rail_App'
    },
    {
      title: 'Credit Card Fraud Detection',
      description: 'Machine learning system to detect fraudulent credit card transactions. Implements advanced ML algorithms for real-time fraud detection and prevention.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Security/ML related image
      techStack: ['Python', 'TensorFlow', 'Scikit-learn'],
      techIcons: [<FaPython />, <SiTensorflow />, <SiScikitlearn />],
      githubUrl: 'https://github.com/jagadeeshm007/Credit_Card_Fraud_Detection'
    },
    {
      title: 'Falcon-9 Success Prediction',
      description: 'ML model to predict the landing success rate of SpaceX Falcon-9 rockets. Analyzes historical data to forecast mission outcomes.',
      image: 'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Rocket/Space related image
      techStack: ['Python', 'Machine Learning', 'Data Analysis'],
      techIcons: [<FaPython />, <FaRocket />, <SiScikitlearn />],
      githubUrl: 'https://github.com/jagadeeshm007/Falcon-9'
    },
    {
      title: 'Event Record Keeping System',
      description: 'Attendance tracking system for college events, developed as part of Project Space 6.0 at Technical Hub.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Event/Calendar related image
      techStack: ['React', 'Node.js', 'Database'],
      techIcons: [<FaReact />, <FaDatabase />],
      githubUrl: 'https://github.com/jagadeeshm007/Record_Keeping_System'
    },
    {
      title: 'Movie Recommendation App',
      description: 'React Native mobile app for personalized movie recommendations based on user preferences and viewing history.',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // Movie/Cinema related image
      techStack: ['React Native', 'Expo', 'API Integration'],
      techIcons: [<FaReact />, <SiExpo />, <FaMobile />],
      githubUrl: 'https://github.com/jagadeeshm007/Movie_Recommendation_Search_App'
    },
    {
      title: 'ML Movie Recommender',
      description: 'Machine learning-based movie recommendation system using collaborative filtering and content-based approaches.',
      image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80', // AI/ML related image
      techStack: ['Python', 'Machine Learning', 'Data Science'],
      techIcons: [<FaPython />, <SiScikitlearn />, <FaDatabase />],
      githubUrl: 'https://github.com/jagadeeshm007/Movie_Recommendation_System'
    }
  ];

  const toggleDescription = (index: number) => {
    setExpandedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const toggleCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Section id={id}>
      <ContentWrapper>
        <Title>Featured Projects</Title>
        <ProjectGrid>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              onHoverEnd={() => {
                if (flippedCards.includes(index)) {
                  setFlippedCards(prev => prev.filter(i => i !== index));
                }
              }}
            >
              <CardInner isFlipped={flippedCards.includes(index)}>
                <CardFront>
                  <ProjectImage src={project.image} alt={project.title} />
                  <ProjectContent>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription 
                      onClick={() => toggleCard(index)}
                    >
                      {project.description}
                    </ProjectDescription>
                    <TechStack>
                      {project.techIcons.map((icon, i) => (
                        <TechTag key={i}>{icon}</TechTag>
                      ))}
                    </TechStack>
                  </ProjectContent>
                  <Links>
                    <GithubButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub /> View on GitHub
                    </GithubButton>
                  </Links>
                </CardFront>
                <CardBack>
                  <ProjectTitle>{project.title}</ProjectTitle>
                  <div style={{ marginBottom: '1rem' }}>
                    {project.description}
                  </div>
                  <TechStack>
                    {project.techIcons.map((icon, i) => (
                      <TechTag key={i}>{icon}</TechTag>
                    ))}
                  </TechStack>
                  <Links style={{ marginTop: 'auto' }}>
                    <GithubButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaGithub /> View on GitHub
                    </GithubButton>
                  </Links>
                </CardBack>
              </CardInner>
            </ProjectCard>
          ))}
        </ProjectGrid>
      </ContentWrapper>
    </Section>
  );
};

export default ProjectsSection; 