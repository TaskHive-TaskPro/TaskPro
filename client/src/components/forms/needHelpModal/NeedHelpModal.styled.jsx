// src/components/.../YOUR_PATH_HERE.styled.jsx
import styled from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

/* --- Sabit palet --- */
const PAPER = '#FCFCFC';
const TEXT_PRIMARY = '#161616';
const TEXT_SECONDARY = 'rgba(22,22,22,0.8)';
const INFO_BORDER = 'rgba(190,219,176,0.5)'; // mint yarı saydam
const HINT = '#BEDBB0';                      // mint
const FOCUS_RING = 'rgba(190,219,176,0.35)';
const ERROR_COLOR = '#ff6b6b';
const BTN_HOVER = '#A7C696';                 // mint koyusu

export const Section = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  background-color: ${PAPER};
  color: ${TEXT_PRIMARY};

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

export const ErrorSection = styled(ErrorMessage)`
  position: absolute;
  bottom: -7px;
  padding-left: 14px;
  margin: 0;
  color: ${ERROR_COLOR};
  font-size: 12px;
  font-family: Poppins;
  font-weight: 500;
  letter-spacing: -0.36px;
`;

export const TitleInput = styled(Field)`
  display: inline-block;
  width: 100%;
  height: 49px;
  padding: 14px 18px;

  font-size: 14px;
  font-family: 'Poppins';
  letter-spacing: -0.28px;

  color: ${TEXT_PRIMARY};
  background: inherit;
  border: 1px solid ${INFO_BORDER};
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: ${TEXT_SECONDARY};
    font-size: 14px;
  }

  &:focus {
    border-color: ${HINT};
    box-shadow: 0 0 0 2px ${FOCUS_RING};
  }
`;

export const Textarea = styled(Field)`
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

  color: ${TEXT_PRIMARY};
  background: inherit;
  border: 1px solid ${INFO_BORDER};
  outline: none;
  border-radius: 8px;

  &::placeholder {
    color: ${TEXT_SECONDARY};
    font-size: 14px;
  }

  &:focus {
    border-color: ${HINT};
    box-shadow: 0 0 0 2px ${FOCUS_RING};
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

  background-color: ${HINT};
  color: ${TEXT_PRIMARY};
  border-radius: 8px;
  border: none;
  cursor: pointer;

  transition: background-color 200ms linear, opacity 150ms ease;

  &:hover,
  &:focus {
    background-color: ${BTN_HOVER};
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
  padding: 0;
  line-height: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
