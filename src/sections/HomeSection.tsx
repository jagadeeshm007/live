import styled from '@emotion/styled';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import Section from '../components/Section';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaTrophy, FaCertificate, FaCode, FaDownload } from 'react-icons/fa';

const HeroSection = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at center, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding-top: 80px;
  
  // Remove any potential margins from parent elements
  * {
    margin: 0;
    padding: 0;
  }

  &::before {
    content: '';
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(
      circle,
      rgba(37, 99, 235, 0.1) 0%,
      rgba(37, 99, 235, 0.05) 25%,
      transparent 70%
    );
    animation: glow 10s linear infinite;
  }

  @keyframes glow {
    0% { transform: translate(-25%, -25%) rotate(0deg); }
    100% { transform: translate(-25%, -25%) rotate(360deg); }
  }
`;

const StyledSection = styled.section`
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  position: relative;
`;

const ContentSection = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 3rem;
  align-items: center;
  z-index: 1;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
    margin-top: 1rem;
    place-items: center;
  }
`;

const PhotoContainer = styled(motion.div)`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  border: 2px solid rgba(147, 51, 234, 0.3);
  box-shadow: 0 0 30px rgba(147, 51, 234, 0.2);
  
  @media (max-width: 768px) {
    width: 80%;
    margin: 0 auto;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Name = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-family: 'JetBrains Mono', 'Roboto Mono', 'Courier New', monospace;
  font-weight: 800;
  white-space: nowrap;
  margin-bottom: 1rem;
  background: linear-gradient(90deg, #fff 0%, #a8a8a8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
  letter-spacing: -1px;

  @media (max-width: 768px) {
    font-size: clamp(2rem, 4vw, 3rem);
  }
`;

const Title = styled(motion.h2)`
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  background: linear-gradient(90deg, #888 0%, #666 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 2rem;
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    color: #007AFF;
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 122, 255, 0.2);
  }
`;

const HighlightSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const BioText = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  margin: 2rem 0;
  max-width: 600px;
`;

const ResumeButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(147, 51, 234, 0.9),
    rgba(147, 51, 234, 0.7)
  );
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(147, 51, 234, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(147, 51, 234, 0.4);
  }

  svg {
    font-size: 1.2rem;
  }
`;

interface HomeSectionProps {
  id: string;
}

const HomeSection: React.FC<HomeSectionProps> = ({ id }) => {
  const { scrollY } = useScroll();
  const y = useMotionValue(0);
  
  // Create scroll-based transforms
  const nameOpacity = useTransform(scrollY, [0, 200], [1, 0]);
  const nameY = useTransform(scrollY, [0, 200], [0, -50]);
  
  const titleOpacity = useTransform(scrollY, [50, 250], [1, 0]);
  const titleY = useTransform(scrollY, [50, 250], [0, -50]);
  
  const highlightOpacity = useTransform(scrollY, [100, 300], [1, 0]);
  const highlightY = useTransform(scrollY, [100, 300], [0, -50]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <Section id={id}>
      <HeroSection>
        <ContentSection>
          <HighlightSection>
            <motion.div>
              <Name>JAGADEESH MANDALA</Name>
              <Title>Aspiring Software Engineer</Title>
              
              <BioText>
                Passionate software engineer with expertise in full-stack development
                and cloud technologies. I specialize in building scalable applications
                and implementing DevOps practices. AWS certified with a strong
                foundation in competitive programming.
              </BioText>

              <ResumeButton
                href="https://drive.google.com/file/d/1RJvIT_8BpfKJRLjTHdqioo4uCarE-zqn/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaDownload />Resume
              </ResumeButton>
            </motion.div>
          </HighlightSection>

          <PhotoContainer>
            <ProfileImage src="pfp.png" alt="Profile" />
          </PhotoContainer>
        </ContentSection>
      </HeroSection>
    </Section>
  );
};

export default HomeSection; 