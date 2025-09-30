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
  stroke: ${p => p.theme.palette.secondary.error};
`;

export const TitleButton = styled.span`
  color: ${p => p.theme.palette.secondary.info};
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

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

export const PlusIconColumn = styled.svg`
  width: 14px;
  height: 14px;
  flex: 0 0 auto;
  stroke: ${p => p.theme.palette.text.primary}; /* görünür olsun */
`;

export const TitleButtonColumn = styled.span`
  color: ${p => p.theme.palette.text.primary};
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
`;
