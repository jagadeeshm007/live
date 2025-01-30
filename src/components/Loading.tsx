import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingDot = styled(motion.div)`
  width: 12px;
  height: 12px;
  margin: 0 4px;
  border-radius: 50%;
  background: ${props => props.theme.colors.accent};
`;

const Loading = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const dotVariants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <LoadingContainer
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {[0, 1, 2].map((index) => (
        <LoadingDot
          key={index}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: index * 0.1 }}
        />
      ))}
    </LoadingContainer>
  );
};

export default Loading; 