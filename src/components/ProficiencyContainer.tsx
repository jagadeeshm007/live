import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Container = styled(motion.div)`
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 3;
  position: relative;
  margin-top: 20rem;
  margin-left: 5rem;

  @media (max-width: 768px) {
    height: 1.75rem;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    height: 1.5rem;
    gap: 1rem;
  }
`;

const ProficiencyText = styled(motion.span)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.2rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  position: relative;
  z-index: 2;
  min-width: 200px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1rem;
    min-width: 180px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    min-width: 160px;
  }
`;

const DecorativeShape = styled(motion.div)`
  width: 12px;
  height: 12px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 50%;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 480px) {
    width: 8px;
    height: 8px;
  }
`;

const proficiencies = [
  "Software Engineer",
  "React Native Developer",
  "Full Stack Developer",
  "Cloud Engineer",
  "DevOps Engineer",
  "Site Reliability Engineer",
];

export const ProficiencyContainer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % proficiencies.length);
    }, 8000); // Changed to 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <DecorativeShape
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
      />
      <AnimatePresence mode="wait">
        <ProficiencyText
          key={currentIndex}
          initial={{ 
            opacity: 0,
            y: 20,
            scale: 0.9
          }}
          animate={{ 
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{ 
            opacity: 0,
            y: -20,
            scale: 0.9
          }}
          transition={{ 
            duration: 0.8,
            ease: [0.43, 0.13, 0.23, 0.96],
            opacity: { duration: 0.5 }
          }}
        >
          {proficiencies[currentIndex]}
        </ProficiencyText>
      </AnimatePresence>
      <DecorativeShape
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          delay: 2.5
        }}
      />
    </Container>
  );
}; 