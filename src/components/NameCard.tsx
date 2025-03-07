import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
interface CategoryItem {
  id: string;
  label: string;
  description: string;
}

const categoryList: CategoryItem[] = [
  {
    id: 'anyone',
    label: 'Anyone',
    description: "I craft digital products with precision that set new standards, blending exceptional design with engineering craftsmanship to move beyond the current, mass-produced landscape."
  },
  {
    id: 'engineers',
    label: 'Engineers',
    description: "My curiosity for technology has driven my growth, shaping my system-thinking mindset. I constantly create interactive experiments and build websites in Webflow, like this one, to reinforce my skills."
  },
  {
    id: 'founders',
    label: 'Founders',
    description: "I bring passionate energy to every project I work on, taking ownership and putting in the effort as if it were my own. I'm driven to innovate through creativity, challenging the status quo and redefining boundaries."
  },
  {
    id: 'designTeam',
    label: 'Design Team',
    description: "I focus on raising the bar for design quality, striving for excellence, and inspiring and motivating others. Strong problem-solving skills, creativity, and obsessive attention to detail drive my unique perspective on product design."
  }
];

const RedAccent = styled.div`
  width: 24px;
  height: 24px;
  background-color: #FF4444;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
    margin-bottom: 1rem;
  }
`;

const NameCardWrapper = styled(motion.div)`
  position: absolute;
  left: 2rem;
  top: 10rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  z-index: 3;

  @media (max-width: 768px) {
    position: relative;
    left: 0;
    top: 0;
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 0.5rem;
  }
`;

const NameCardBox = styled(motion.div)`
  background: #F5F5F5;
  padding: 2rem;
  width: 600px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1024px) {
    width: 500px;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.25rem;
    flex-direction: column;
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const NameCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const NameCardTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Name = styled.h1`
  font-size: 1rem;
  font-weight: 500;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  margin-right: 0.5rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Role = styled.span`
  font-size: 1rem;
  color: #666666;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Categories = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 480px) {
    gap: 0.75rem;
  }
`;

const Category = styled.span<{ isActive: boolean }>`
  font-size: 0.9rem;
  color: ${props => props.isActive ? '#FF4444' : '#666666'};
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 1px;
    background-color: ${props => props.isActive ? '#FF4444' : '#666666'};
    transition: width 0.3s ease;
  }

  &:hover {
    color: #FF4444;
  }

  &:hover:after {
    width: 100%;
    background-color: #FF4444;
  }
`;

const Description = styled(motion.p)`
  font-size: 1rem;
  color: #000000;
  font-family: 'JetBrains Mono', monospace;
  line-height: 1.6;
  margin-top: 2rem;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: 450px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.95rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
    margin-top: 1.5rem;
  }
`;

const MobileContainer = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 2rem;
  }
`;

interface NameCardProps {
  name: string;
  role: string;
}

export const NameCard: React.FC<NameCardProps> = ({ name, role }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem['id']>(categoryList[0].id);

  return (
    <NameCardWrapper>
      <NameCardBox
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <RedAccent />
        <NameCardContent>
          <NameCardTitle>
            <Name>{name}</Name>
            <Role>{role}</Role>
          </NameCardTitle>
          <Categories>
            {categoryList.map((category) => (
              <Category 
                key={category.id}
                isActive={selectedCategory === category.id}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Category>
            ))}
          </Categories>
          <AnimatePresence mode="wait">
            <Description
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {categoryList.find(cat => cat.id === selectedCategory)?.description}
            </Description>
          </AnimatePresence>
        </NameCardContent>
      </NameCardBox>
      <MobileContainer>
      </MobileContainer>
    </NameCardWrapper>
  );
}; 