import styled from '@emotion/styled';
import {  useMotionValue, useScroll, useTransform } from 'framer-motion';
import { Section } from './styles';
import { useState, useEffect, useRef, SetStateAction } from 'react';
import { LeftIllustration } from './LeftIllustration';
import { registerScrollHandler } from './About';
import { NameCard } from './NameCard';
import { DailyQuote } from './DailyQuote';
import { ProficiencyContainer } from './ProficiencyContainer';

const HeroContainer = styled(Section)`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  color: #000000;
  padding: 0 4rem;
  perspective: 1000px;

  @media (max-width: 768px) {
    padding: 0 1rem;
    flex-direction: column;
    justify-content: flex-start;
    height: auto;
    min-height: 100vh;
    padding-top: 5rem;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 3rem;
    margin-top: 2rem;
    order: 2;
    position: relative;
    z-index: 5;
  }
`;

const DesktopIllustration = styled.div`
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    display: none;
  }
`;

const GridBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-image: 
    linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  padding: 2rem 4rem;
  border-radius: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NameCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  z-index: 10;
`;

export const Hero = () => {
  const [aboutSectionScroll, setAboutSectionScroll] = useState(0);
  const heroSectionRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // For the hero section's own scroll progress
  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end end"]
  });
  
  // Register scroll handler for the About section
  useEffect(() => {
    const unsubscribe = registerScrollHandler((progress: SetStateAction<number>) => {
      setAboutSectionScroll(progress);
    });
    
    return unsubscribe;
  }, []);

  // Animation values based on both the hero section scroll and about section scroll
  const illustrationX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "100%", "200%"]
  );
  
  const illustrationY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["0%", "0%", "0%"]
  );
  
  // Use the About section's scroll to control the final movement to the right
  const illustrationFinalX = useTransform(
    useMotionValue(aboutSectionScroll),
    [0, 0.5],
    ["200%", "300%"]
  );
  
  const illustrationFinalY = useTransform(
    useMotionValue(aboutSectionScroll),
    [0, 0.5],
    ["0%", "0%"]
  );

  const illustrationOpacity = useTransform(
    useMotionValue(aboutSectionScroll),
    [0, 0.1, 0.9, 1],
    [1, 1, 0.8, 0.6]
  );

  // Combined x and y positions based on both scroll positions
  const combinedX = useTransform(
    [illustrationX, illustrationFinalX],
    ([x1, x2]) => {
      return aboutSectionScroll > 0 ? x2 : x1;
    }
  );
  
  const combinedY = useTransform(
    [illustrationY, illustrationFinalY],
    ([y1, y2]) => {
      return aboutSectionScroll > 0 ? y2 : y1;
    }
  );

  return (
    <HeroContainer
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
      ref={heroSectionRef}
    >
      <GridBackground />
      <DailyQuote />
      <NameCardContainer>
        <NameCard 
          name="Jagadeesh Mandala"
          role="Software Engineer"
        />
        <ProficiencyContainer />
      </NameCardContainer>
      
      <DesktopIllustration>
        <LeftIllustration
          combinedX={combinedX}
          combinedY={combinedY}
          illustrationOpacity={illustrationOpacity}
          aboutSectionScroll={aboutSectionScroll}
        />
      </DesktopIllustration>
      <MobileContainer>
        <LeftIllustration 
          combinedX={0} 
          combinedY={0} 
          illustrationOpacity={1} 
          aboutSectionScroll={0}
        />
      </MobileContainer>
      <ContentWrapper />
    </HeroContainer>
  );
};