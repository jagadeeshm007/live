import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Contact as ContactComponent } from '../components/Contact';
import { ScrollToTop } from '../components/ScrollToTop';

const PageContainer = styled.div`
  padding-top: 6rem;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding-top: 4rem;
  }
`;

export const Contact = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PageContainer>
        <ScrollToTop />
        <ContactComponent />
      </PageContainer>
    </motion.div>
  );
}; 