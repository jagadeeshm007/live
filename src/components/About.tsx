import styled from '@emotion/styled';
import { motion, useScroll } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import React from 'react';

const AboutContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #000000;
    margin-bottom: 1.5rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #4b5563;
    margin-bottom: 1.5rem;
  }
`;

const HeroIllustrationPlaceholder = styled(motion.div)`
  width: 100%;
  height: 400px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(
    135deg,
rgb(255, 255, 255) 0%,
rgb(222, 222, 222) 15%,
rgb(165, 165, 165) 35%,
rgb(77, 77, 77) 55%,
rgb(48, 48, 48) 75%,
rgb(0, 0, 0) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-family: 'JetBrains Mono', monospace;
`;

const ViewMoreButton = styled(motion.button)`
  background: #000000;
  color: #ffffff;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 2rem auto 0;
  position: relative;
  z-index: 10;

  &:hover {
    background: #333333;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Define types for scroll handlers
type ScrollHandler = (progress: number) => void;

// Create a global state/context management function to control illustration position
let globalScrollHandlers: ScrollHandler[] = [];

export const registerScrollHandler = (handler: ScrollHandler): () => void => {
  globalScrollHandlers.push(handler);
  return () => {
    globalScrollHandlers = globalScrollHandlers.filter(h => h !== handler);
  };
};

export const triggerScrollHandlers = (progress: number): void => {
  globalScrollHandlers.forEach(handler => handler(progress));
};

export const About = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Get scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Use this to communicate with the Hero component about scroll position
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value: number) => {
      triggerScrollHandlers(value);
    });
    
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress]);

  const handleViewMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/about');
  };

  return (
    <AnimatedSection id="about" ref={sectionRef}>
      <AboutContainer>
        <AboutContent>
          <AboutText>
            <AboutTitle
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              About Me
            </AboutTitle>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              I'm a passionate software engineer with expertise in full-stack development and cloud technologies. 
              With a strong foundation in modern web development and a keen interest in emerging technologies, 
              I strive to create efficient and scalable solutions that make a difference.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              My journey in software development has been driven by a constant desire to learn and innovate. 
              I enjoy working on challenging projects that push the boundaries of what's possible in web and 
              mobile development.
            </motion.p>
          </AboutText>
          
          <HeroIllustrationPlaceholder
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          />
        </AboutContent>
        <ViewMoreButton
          onClick={handleViewMore}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Learn More About Me
        </ViewMoreButton>
      </AboutContainer>
    </AnimatedSection>
  );
};