import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Quote, techQuotes } from '../data/quotes';

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;

const QuoteContainer = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
  margin-top: 64px;
  overflow: hidden;
`;

const QuoteContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  animation: ${scroll} 40s linear infinite;
  cursor: pointer;
  &:hover {
    animation-play-state: paused;
  }
`;

// Timer components (commented out for future use)
/*
const NextQuoteTimer = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4b5563;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const TimerValue = styled.span`
  font-weight: 600;
  color: #2563eb;
`;
*/

// const QuoteLabel = styled.span`
//   font-size: 0.9rem;
//   color: #666;
//   font-weight: 600;
//   margin-right: 2rem;
//   text-transform: uppercase;
//   letter-spacing: 1px;
// `;

const QuoteText = styled.span`
  font-size: 1rem;
  color: #333;
  margin-right: 1rem;
  font-style: italic;
`;

const QuoteAuthor = styled.span`
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
  margin-right: 1rem;
`;

const QuoteCategory = styled.span`
  font-size: 0.8rem;
  color: #4b5563;
  background: #f3f4f6;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  margin-right: 2rem;
`;

const QuoteOfTheDay = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [timeUntilNext, setTimeUntilNext] = useState<string>('');

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const seed = today.split('-').join('');
        const index = parseInt(seed) % techQuotes.length;
        setQuote(techQuotes[index]);
      } catch (error) {
        console.error('Error fetching quote:', error);
        setQuote(techQuotes[0]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuote();
  }, []);

  // Timer effect (commented out for future use)
  /*
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeUntilNext(`${hours}h ${minutes}m ${seconds}s`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);
  */

  if (isLoading) {
    return null;
  }

  return (
    <QuoteContainer>
      {/* <NextQuoteTimer>
        Next quote in: <TimerValue>{timeUntilNext}</TimerValue>
      </NextQuoteTimer> */}
      <QuoteContent>
        {quote && (
          <>
            {/* <QuoteLabel>Quote of the Day</QuoteLabel> */}
            <QuoteText>"{quote.content}"</QuoteText>
            <QuoteAuthor>— {quote.author}</QuoteAuthor>
            <QuoteCategory>{quote.category}</QuoteCategory>
          </>
        )}
      </QuoteContent>
    </QuoteContainer>
  );
};

export default QuoteOfTheDay; 