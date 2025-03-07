import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const NarutoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

const UzumakiSymbol = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  display: block;
  clip-path: circle(50%);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.3));
  animation: ${spin} 20s linear infinite;
`;

const Naruto = () => {
  return (
    <NarutoContainer>
      <UzumakiSymbol 
        src="/uzumaki-clan-symbol/img.jpg" 
        alt="Uzumaki Clan Symbol"
      />
    </NarutoContainer>
  );
};

export default Naruto;
