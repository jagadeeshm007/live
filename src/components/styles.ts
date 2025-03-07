import styled from '@emotion/styled';
import { motion } from 'framer-motion';
export const Section = styled(motion.section)`
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
`;

export const Card = styled(motion.div)`
  background: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 2rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
`;

export const ListItem = styled.li`
  margin-bottom: 0.5rem;
  color: #666;
`; 