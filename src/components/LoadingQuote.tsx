import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.98);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const QuoteText = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.5rem;
  text-align: center;
  max-width: 800px;
  margin-bottom: 1rem;
  line-height: 1.6;
  color: #000;

  @media (max-width: 1024px) {
    font-size: 1.35rem;
    max-width: 700px;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    max-width: 600px;
    line-height: 1.5;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    max-width: 100%;
    line-height: 1.4;
  }
`;

const QuoteAuthor = styled(motion.p)`
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: #666;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const LoadingBar = styled(motion.div)`
  width: 200px;
  height: 2px;
  background: #eee;
  margin-top: 2rem;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 180px;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    width: 150px;
    margin-top: 1.25rem;
  }
`;

const LoadingProgress = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: #000;
  width: 100%;
`;

const quotes = [
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House"
  },
  {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson"
  },
  {
    text: "Make it work, make it right, make it fast.",
    author: "Kent Beck"
  },
  {
    text: "Simplicity is the soul of efficiency.",
    author: "Austin Freeman"
  },
  {
    text: "Clean code always looks like it was written by someone who cares.",
    author: "Robert C. Martin"
  }
];

interface LoadingQuoteProps {
  isVisible: boolean;
  isInitialLoad: boolean;
}

export const LoadingQuote = ({ isVisible, isInitialLoad }: LoadingQuoteProps) => {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);

  useEffect(() => {
    if (isVisible) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: isInitialLoad ? 0.5 : 0.3 }}
        >
          <QuoteText
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: isInitialLoad ? 0.3 : 0.2,
              duration: isInitialLoad ? 0.5 : 0.3
            }}
          >
            "{currentQuote.text}"
          </QuoteText>
          <QuoteAuthor
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              delay: isInitialLoad ? 0.5 : 0.3,
              duration: isInitialLoad ? 0.5 : 0.3
            }}
          >
            — {currentQuote.author}
          </QuoteAuthor>
          <LoadingBar>
            <LoadingProgress
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{
                duration: isInitialLoad ? 2 : 1,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          </LoadingBar>
        </LoadingContainer>
      )}
    </AnimatePresence>
  );
}; 