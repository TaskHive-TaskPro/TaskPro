import styled from 'styled-components';
import { Form } from 'formik';

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  background-color: ${props => props.theme.palette.background.paper};
  color: ${props => props.theme.palette.text.primary};
  width: 100%;
  max-width: 400px;
  border-radius: 8px;
  gap: 24px;
  padding: 24px;
  box-sizing: border-box;
  pointer-events: auto;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-family: 'Poppins';
  font-weight: 600;
  letter-spacing: -0.36px;
  color: inherit;
  margin: 0;
`;

export const ModalForm = styled(Form)`
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  margin-bottom: 24px;
  gap: 16px;
`;

export const Container = styled.div`
  line-height: 0;
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 0;
`;

export const ErrorSection = styled.div`
  position: absolute;
  bottom: -7px;
  padding-left: 14px;
  margin: 0;
  color: var(--color-pastel);
  font-size: 12px;
  font-family: Poppins;
  font-weight: 500;
  letter-spacing: -0.36px;
`;

export const TitleInput = styled.input`
  display: inline-block;
  width: 100%;
  height: 49px;
  padding: 14px 18px;

  font-size: 14px;
  font-family: 'Poppins';
  letter-spacing: -0.28px;

  color: ${props => props.theme.palette.text.primary};
  background: inherit;
  border: 1px solid ${props => props.theme.palette.text.disabled};
  border-radius: 8px;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 14px;
  }

  &:focus {
    border-color: ${props => props.theme.palette.primary.main};
  }

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.palette.text.secondary};
  }
`;

export const Textarea = styled.textarea`
  display: inline-block;
  resize: none;
  width: 100%;
  height: 120px;
  padding: 14px 18px;
  margin-top: 14px;

  font-size: 14px;
  font-family: 'Poppins';
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.28px;

  color: ${props => props.theme.palette.text.primary};
  background: inherit;
  border: 1px solid ${props => props.theme.palette.text.disabled};
  outline: none;
  border-radius: 8px;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.palette.text.secondary};
    font-size: 14px;
  }

  &:focus {
    border-color: ${props => props.theme.palette.primary.main};
  }

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.palette.text.secondary};
  }
`;

export const AuthFormSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 14px;

  font-family: 'Poppins';
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.28px;

  background-color: ${props => {
    // Violet tema için #B8BCFD
    if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
      return '#B8BCFD';
    }
    // Light ve Dark tema için #BEDBB0
    return '#BEDBB0';
  }};
  color: ${props => {
    // Violet tema için beyaz
    if (props.theme.palette.mode === 'light' && props.theme.palette.primary.main === '#5255BC') {
      return props.theme.palette.primary.hint;
    }
    // Light ve Dark tema için siyah
    return '#000000';
  }};
  border-radius: 8px;
  border: none;
  cursor: pointer;

  transition: background-color 0.2s ease, opacity 0.15s ease, transform 0.1s ease;

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

export const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  padding: 4px;
  line-height: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease, transform 0.1s ease;
  border-radius: 4px;

  &:hover {
    opacity: 0.7;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

export const SuccessMessage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  padding: 16px;
  gap: 12px;
  background-color: #e8f5e9;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
  margin-top: 16px;
  width: 100%;
  box-sizing: border-box;
  
  svg {
    width: 32px;
    height: 32px;
    min-width: 32px;
    color: #4caf50;
    flex-shrink: 0;
  }
  
  div {
    flex: 1;
  }
  
  h3 {
    font-size: 16px;
    font-family: 'Poppins';
    font-weight: 600;
    color: #2e7d32;
    margin: 0 0 4px 0;
  }
  
  p {
    font-size: 13px;
    font-family: 'Poppins';
    color: #388e3c;
    margin: 0;
    line-height: 1.4;
  }
`;
