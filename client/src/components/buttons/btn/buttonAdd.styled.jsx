import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 334px;
  height: 56px;
  border-radius: 8px;
  padding: 20px 18px;
  border: none;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: background-color 0.2s ease, transform 0.1s ease, opacity 0.15s ease;

  background-color: ${props => {
    // Violet tema için #B8BCFD
    if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
      return '#B8BCFD';
    }
    // Light ve Dark tema için #BEDBB0
    return '#BEDBB0';
  }};

  &:hover:not(:disabled) {
    background-color: ${props => {
      // Violet tema hover için #979CEA
      if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
        return '#979CEA';
      }
      // Light ve Dark tema hover için #9DC888
      return '#9DC888';
    }};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
export const PlusIcon = styled.svg`
  width: 14px;
  height: 14px;
  stroke: ${props => {
    // Violet temada koyu mor
    if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
      return '#5255BC';
    }
    // Light ve Dark temalarda siyah
    return '#000000';
  }};
`;

export const TitleButton = styled.p`
  color: ${props => {
    // Violet temada koyu mor
    if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
      return '#5255BC';
    }
    // Light ve Dark temalarda siyah
    return '#000000';
  }};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;

export const ContainerColumn = styled.button`
  display: flex;
  flex-shrink: 0;
  width: 100%;
  max-width: 334px;
  height: 56px;
  border-radius: 8px;

  padding: 20px 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => {
    return props.theme.palette.background.paper;
  }};
`;
export const PlusIconColumn = styled.svg`
  width: 14px;
  height: 14px;
  stroke: ${props => {
    return props.theme.palette.background.paper;
  }};
`;

export const TitleButtonColumn = styled.p`
  color: ${props => {
    return props.theme.palette.text.primary;
  }};
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin-left: 8px;
`;