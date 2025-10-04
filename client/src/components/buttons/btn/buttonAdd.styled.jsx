// src/components/buttons/btn/buttonAdd/buttonAdd.styled.jsx
import styled from 'styled-components';

/* Sabit palet */
const MINT = '#BEDBB0';
const MINT_HOVER = '#A7C696';
const TEXT_DARK = '#161616';
const PAPER = '#FCFCFC';
const FOCUS_RING = '#161616';

export const Container = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 334px;
  height: 56px;
  border-radius: 8px;
  padding: 20px 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  /* Zemin + metin/ikon rengi */
  background-color: ${MINT};
  color: ${TEXT_DARK};

  transition: background-color 200ms linear, transform 120ms ease, opacity 150ms ease;

  &:hover,
  &:focus {
    background-color: ${MINT_HOVER};
  }

  &:focus-visible {
    outline: 2px solid ${FOCUS_RING};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const PlusIcon = styled.svg`
  width: 14px;
  height: 14px;
  /* Container'daki color'ı kullanır */
  color: #FCFCFC;
  fill: #FCFCFC;
  stroke: #FCFCFC;
`;

export const TitleButton = styled.p`
  margin-left: 8px;
  color: ${TEXT_DARK};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

export const ContainerColumn = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 334px;
  height: 56px;
  border-radius: 8px;
  padding: 20px 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background-color: ${PAPER};
  color: ${TEXT_DARK};

  &:hover {
    background-color: rgba(22, 22, 22, 0.06);
  }

  &:focus-visible {
    outline: 2px solid ${FOCUS_RING};
    outline-offset: 2px;
  }
`;

export const PlusIconColumn = styled.svg`
  width: 14px;
  height: 14px;
  color: #FCFCFC;     /* ContainerColumn’dan devralır */
  fill: #FCFCFC;
  stroke: #FCFCFC;
`;

export const TitleButtonColumn = styled.p`
  margin-left: 8px;
  color: ${TEXT_DARK};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
