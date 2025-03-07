import styled from '@emotion/styled';
import { motion} from 'framer-motion';
import { useState, useEffect } from 'react';
import Naruto from './Naruto';

const LeftIllustrationContainer = styled(motion.div)`
  width: 400px;
  height: 400px;
  position: relative;
  z-index: 2;
  transform-style: preserve-3d;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 350px;
    height: 350px;
  }

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
    margin: 0 auto;
    position: relative;
    left: auto !important;
    top: auto !important;
    transform: none !important;
  }

  @media (max-width: 480px) {
    width: 250px;
    height: 250px;
  }
`;

const Cube = styled(motion.div)`
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.01);
    transform: translate(-50%, -50%) translateZ(-1px);
    
    backdrop-filter: blur(0.5px);
  }
`;

const CubeFace = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.03);
  backdrop-filter: blur(1px);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.05),
    inset 0 0 15px rgba(0, 0, 0, 0.03);
  border-radius: 8px;

  @media (max-width: 1024px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 768px) {
    width: 160px;
    height: 160px;
  }

  @media (max-width: 480px) {
    width: 140px;
    height: 140px;
    box-shadow: 
      0 2px 4px rgba(0, 0, 0, 0.05),
      inset 0 0 10px rgba(0, 0, 0, 0.03);
  }
`;

interface LeftIllustrationProps {
  combinedX: any;
  combinedY: any;
  illustrationOpacity: any;
  aboutSectionScroll: number;
}

export const LeftIllustration = ({ combinedX, combinedY, illustrationOpacity }: LeftIllustrationProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [transformDistance, setTransformDistance] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setTransformDistance(mobile ? 80 : 100);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseDown = (e: { clientX: number; clientY: number; }) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - rotation.y,
      y: e.clientY - rotation.x
    });
  };

  const handleMouseMove = (e: { clientY: number; clientX: number; }) => {
    if (!isDragging) return;
    
    setRotation({
      x: e.clientY - dragStart.y,
      y: e.clientX - dragStart.x
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <LeftIllustrationContainer
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      style={{
        x: combinedX,
        y: combinedY,
        opacity: illustrationOpacity,
        position: !isMobile ? 'fixed' : 'relative',
        left: !isMobile ? 0 : 'auto',
        top: !isMobile ? '20%' : 'auto',
        transition: "all 0.5s ease-out"
      }}
    >
      <Naruto />
      <Cube
        animate={{
          rotateX: isDragging ? rotation.x * 0.5 : [0, 360],
          rotateY: isDragging ? rotation.y * 0.5 : [0, 360],
          x: mousePosition.x * (isMobile ? 5 : 20),
          y: mousePosition.y * (isMobile ? 5 : 20),
        }}
        transition={{
          duration: isDragging ? 0 : 20,
          repeat: isDragging ? 0 : Infinity,
          ease: "linear",
          x: { duration: 0.2, ease: "easeOut" },
          y: { duration: 0.2, ease: "easeOut" },
        }}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <CubeFace style={{ transform: `translateZ(${transformDistance}px)` }} />
        <CubeFace style={{ transform: `translateZ(-${transformDistance}px) rotateY(180deg)` }} />
        <CubeFace style={{ transform: `translateX(${transformDistance}px) rotateY(90deg)` }} />
        <CubeFace style={{ transform: `translateX(-${transformDistance}px) rotateY(-90deg)` }} />
        <CubeFace style={{ transform: `translateY(${transformDistance}px) rotateX(90deg)` }} />
        <CubeFace style={{ transform: `translateY(-${transformDistance}px) rotateX(-90deg)` }} />
      </Cube>
    </LeftIllustrationContainer>
  );
}; 