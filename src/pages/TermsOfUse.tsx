import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ScrollToTop } from '../components/ScrollToTop';

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

const Text = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;

  li {
    color: #4b5563;
    margin-bottom: 0.5rem;
    line-height: 1.7;
  }
`;

export const TermsOfUse = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageContainer>
        <ScrollToTop />
        <PageTitle>Terms of Use</PageTitle>

        <Section>
          <SectionTitle>Acceptance of Terms</SectionTitle>
          <Text>
            By accessing and using this website, you accept and agree to be bound by the terms
            and conditions outlined here. If you do not agree to these terms, please do not use
            this website.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Intellectual Property</SectionTitle>
          <Text>
            All content on this website, including but not limited to text, graphics, logos,
            images, code, and software, is my property and is protected by intellectual
            property laws.
          </Text>
          <List>
            <li>You may not reproduce or distribute the content without permission</li>
            <li>You may not modify or create derivative works</li>
            <li>All rights not expressly granted are reserved</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Use License</SectionTitle>
          <Text>
            Permission is granted to temporarily view the content for personal, non-commercial
            use only. This is the grant of a license, not a transfer of title.
          </Text>
          <Text>Under this license, you may not:</Text>
          <List>
            <li>Use the content for commercial purposes</li>
            <li>Remove any copyright or proprietary notations</li>
            <li>Transfer the materials to another person</li>
            <li>Mirror or frame the website on any other server</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Disclaimer</SectionTitle>
          <Text>
            The content on this website is provided "as is". I make no warranties, expressed
            or implied, and hereby disclaim and negate all other warranties including, without
            limitation, implied warranties of merchantability or fitness for a particular purpose.
          </Text>
        </Section>

        <Section>
          <SectionTitle>External Links</SectionTitle>
          <Text>
            This website may contain links to external websites. I am not responsible for the
            content or privacy practices of these external sites.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Modifications</SectionTitle>
          <Text>
            I reserve the right to revise these terms of use at any time without notice. By
            using this website, you agree to be bound by the current version of these terms
            of service.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <Text>
            If you have any questions about these Terms of Use, please contact me at{' '}
            <a href="mailto:jagadeeshm943@gmail.com">jagadeeshm943@gmail.com</a>.
          </Text>
        </Section>
      </PageContainer>
    </motion.div>
  );
}; 