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

export const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageContainer>
        <ScrollToTop />
        <PageTitle>Privacy Policy</PageTitle>

        <Section>
          <SectionTitle>Introduction</SectionTitle>
          <Text>
            This Privacy Policy outlines how I collect, use, and protect your personal information
            when you visit my portfolio website. I am committed to ensuring your privacy and
            protecting any information you share with me.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Information Collection</SectionTitle>
          <Text>I may collect the following types of information:</Text>
          <List>
            <li>Contact information (email, phone number) when you reach out to me</li>
            <li>Usage data and analytics to improve website performance</li>
            <li>Cookies and similar tracking technologies</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Use of Information</SectionTitle>
          <Text>The collected information is used to:</Text>
          <List>
            <li>Respond to your inquiries and communications</li>
            <li>Improve website functionality and user experience</li>
            <li>Analyze website traffic and usage patterns</li>
            <li>Protect against unauthorized access</li>
          </List>
        </Section>

        <Section>
          <SectionTitle>Data Protection</SectionTitle>
          <Text>
            I implement appropriate security measures to protect your information from unauthorized
            access, alteration, disclosure, or destruction. However, no internet transmission is
            completely secure, and I cannot guarantee the absolute security of your data.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Third-Party Services</SectionTitle>
          <Text>
            This website may use third-party services for analytics, hosting, and other
            functionalities. These services may collect information as specified in their
            respective privacy policies.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Updates to Privacy Policy</SectionTitle>
          <Text>
            I reserve the right to update this Privacy Policy at any time. Any changes will be
            posted on this page with an updated revision date.
          </Text>
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <Text>
            If you have any questions about this Privacy Policy, please contact me at{' '}
            <a href="mailto:jagadeeshm943@gmail.com">jagadeeshm943@gmail.com</a>.
          </Text>
        </Section>
      </PageContainer>
    </motion.div>
  );
}; 