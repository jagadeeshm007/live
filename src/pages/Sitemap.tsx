import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ScrollToTop } from '../components/ScrollToTop';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 8rem 2rem 4rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 6rem 1.5rem 3rem;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  font-family: 'JetBrains Mono', monospace;
  background: rgb(0, 0, 0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.02em;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'JetBrains Mono', monospace;
  color: #000000;
`;

const LinkList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 1rem;
`;

const StyledLink = styled(Link)`
  color: #4b5563;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    color: #000000;
    background: rgba(0, 0, 0, 0.05);
    transform: translateX(4px);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

const ExternalLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    color: #000000;
    background: rgba(0, 0, 0, 0.05);
    transform: translateX(4px);
  }

  svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
  }
`;

export const Sitemap = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageContainer>
        <ScrollToTop />
        <PageTitle>Sitemap</PageTitle>

        <Section>
          <SectionTitle>Main Navigation</SectionTitle>
          <LinkList>
            <LinkItem>
              <StyledLink to="/">Home</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/about">About</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/projects">Projects</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/blogs">Blog</StyledLink>
            </LinkItem>
          </LinkList>
        </Section>

        <Section>
          <SectionTitle>Legal Pages</SectionTitle>
          <LinkList>
            <LinkItem>
              <StyledLink to="/privacy">Privacy Policy</StyledLink>
            </LinkItem>
            <LinkItem>
              <StyledLink to="/terms">Terms of Use</StyledLink>
            </LinkItem>
          </LinkList>
        </Section>

        <Section>
          <SectionTitle>Social Links</SectionTitle>
          <LinkList>
            <LinkItem>
              <ExternalLink 
                href="https://www.linkedin.com/in/mandalajagadeesh/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                LinkedIn
              </ExternalLink>
            </LinkItem>
            <LinkItem>
              <ExternalLink 
                href="https://github.com/jagadeeshm007" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                GitHub
              </ExternalLink>
            </LinkItem>
            <LinkItem>
              <ExternalLink 
                href="https://x.com/Jagadeesh140703" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Twitter
              </ExternalLink>
            </LinkItem>
            <LinkItem>
              <ExternalLink 
                href="https://www.instagram.com/jagadeesh__1333/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </ExternalLink>
            </LinkItem>
          </LinkList>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <LinkList>
            <LinkItem>
              <ExternalLink href="mailto:jagadeeshm943@gmail.com">
                Email: jagadeeshm943@gmail.com
              </ExternalLink>
            </LinkItem>
            <LinkItem>
              <ExternalLink href="tel:+917893959928">
                Phone: +91 7893959928
              </ExternalLink>
            </LinkItem>
          </LinkList>
        </Section>
      </PageContainer>
    </motion.div>
  );
}; 