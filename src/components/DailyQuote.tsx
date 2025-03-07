import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { techQuotes, Quote } from '../data/quotes';

const QuoteContainer = styled(motion.div)`
  position: fixed;
  top: 5rem;
  right: 0;
  left: 0;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
  pointer-events: none;
  padding: 0 2rem;

  @media (max-width: 768px) {
    top: 4rem;
    height: 2.5rem;
    padding: 0 1rem;
  }

  @media (max-width: 480px) {
    top: 3.5rem;
    height: 2rem;
    padding: 0 0.5rem;
  }
`;

const QuoteWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  max-width: 90%;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    gap: 0.35rem;
  }

  @media (max-width: 480px) {
    padding: 0.35rem 0.75rem;
    gap: 0.25rem;
  }
`;

const ScrollContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;

  @media (max-width: 768px) {
    gap: 0.35rem;
  }

  @media (max-width: 480px) {
    gap: 0.25rem;
  }
`;

const QuoteText = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const QuoteAuthor = styled.span`
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: #666;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
`;

const getDailyQuoteIndex = () => {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const day = Math.floor(diff / oneDay);
  return day % techQuotes.length;
};

export const DailyQuote = () => {
  const [currentQuote, setCurrentQuote] = useState<Quote>(techQuotes[getDailyQuoteIndex()]);
  const [shouldScroll, setShouldScroll] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if text needs scrolling
    if (quoteRef.current && containerRef.current) {
      const isOverflowing = quoteRef.current.scrollWidth > containerRef.current.clientWidth;
      setShouldScroll(isOverflowing);
    }
  }, [currentQuote]);

  useEffect(() => {
    // Update quote at midnight
    const updateQuoteAtMidnight = () => {
      const now = new Date();
      const night = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0, 0, 0
      );
      const msToMidnight = night.getTime() - now.getTime();

      setTimeout(() => {
        setCurrentQuote(techQuotes[getDailyQuoteIndex()]);
        updateQuoteAtMidnight();
      }, msToMidnight);
    };

    updateQuoteAtMidnight();
  }, []);

  return (
    <QuoteContainer>
      <QuoteWrapper ref={containerRef}>
        <ScrollContainer
          ref={quoteRef}
          animate={shouldScroll ? {
            x: [0, (quoteRef.current?.scrollWidth) ? -quoteRef.current?.scrollWidth : 0],
          } : {}}
          transition={shouldScroll ? {
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          } : {}}
        >
          <QuoteText>"{currentQuote.content}"</QuoteText>
          <QuoteAuthor>— {currentQuote.author}</QuoteAuthor>
        </ScrollContainer>
      </QuoteWrapper>
    </QuoteContainer>
  );
}; 