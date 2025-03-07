import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { forwardRef } from 'react';

const SectionContainer = styled(motion.section)`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 5rem 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 4rem 1rem;
    min-height: auto;
  }

  @media (max-width: 480px) {
    padding: 3rem 1rem;
  }
`;

const GridBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.5;

  @media (max-width: 768px) {
    background-size: 15px 15px;
  }

  @media (max-width: 480px) {
    background-size: 10px 10px;
  }
`;

interface AnimatedSectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, id, className, ...props }, ref) => {
    return (
      <SectionContainer
        ref={ref}
        id={id}
        className={className}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
          staggerChildren: 0.2
        }}
        {...props}
      >
        <GridBackground
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        />
        {children}
      </SectionContainer>
    );
  }
); 