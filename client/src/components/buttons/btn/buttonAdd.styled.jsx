// src/components/buttons/btn/buttonAdd/buttonAdd.styled.jsx
import styled from 'styled-components';

export const Container = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  max-width: 334px;
  height: 56px;
  padding: 20px 18px;

  border: 0;
  border-radius: 8px;
  cursor: pointer;

  /* İkonlar için varsayılan yazı/ikon rengi: */
  color: ${p => p.theme.palette.secondary.info};

  background-color: ${p => p.theme.palette.text.hint};
  transition: background-color 200ms linear, opacity 150ms ease;

  &:hover,
  &:focus {
    background-color: ${p => p.theme.palette.text.error};
  }

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
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
  flex: 0 0 auto;

  /* Sprite <use> için önerilen ayarlar: */
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;

  /* İstediğin renge override etmek istersen buradan ver: */
  color: ${p => p.theme.palette.secondary.error};
`;

export const TitleButton = styled.span`
  /* Container'da color verildi; bu da onu kullanır.
     Ayrı renk istersen override edebilirsin. */
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
`;

export const ContainerColumn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  max-width: 334px;
  height: 56px;
  padding: 20px 18px;

  border: 0;
  border-radius: 8px;
  cursor: pointer;

  background-color: ${p => p.theme.palette.background.paper};

  /* Bu varyantta ikon ve metin rengi: */
  color: ${p => p.theme.palette.text.primary};

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

export const PlusIconColumn = styled.svg`
  width: 14px;
  height: 14px;
  flex: 0 0 auto;

  display: inline-block;
  fill: currentColor;
  stroke: currentColor;

  /* ContainerColumn’dan gelen currentColor’ı kullanır */
  /* İstersen burada da ayrıca renk verebilirsin: */
  /* color: ${p => p.theme.palette.text.primary}; */
`;

export const TitleButtonColumn = styled.span`
  /* ContainerColumn’da color var; onu devralır */
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
`;
