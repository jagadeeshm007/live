import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SectionProps {
  id: string;
  children: React.ReactNode;
}

const SectionWrapper = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  scroll-margin-top: 48px;
  
  // Only apply max-width and padding to non-home sections
  ${props => props.id !== 'home' && `
    padding: 80px 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1200px;
    margin: 0 auto;
  `}
`;

const Section: React.FC<SectionProps> = ({ id, children }) => {
  const { ref, controls } = useScrollAnimation();

  return (
    <SectionWrapper
      id={id}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99]
          }
        }
      }}
    >
      {children}
    </SectionWrapper>
  );
};

export default Section; 

export const sections = [
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'about',
    label: 'About',
  },
  {
    id: 'skills',
    label: 'Skills',
  },
  {
    id: 'projects',
    label: 'Projects',
  },
  {
    id: 'contact',
    label: 'Contact',
  },
]; 