import styled, { keyframes, css } from 'styled-components';
import { Form, Field, ErrorMessage } from 'formik';

/* ---- Animations ---- */
const selectPop = keyframes`
  0%   { transform: scale(.92); }
  70%  { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const hoverWobble = keyframes`
  0%,100% { transform: translateY(0) rotate(0deg); }
  50%     { transform: translateY(-1px) rotate(-2deg); }
`;

const FormContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
  background: ${({ theme }) => theme.palette.background.paper};
  color: ${({ theme }) => theme.palette.text.secondary};
  border-radius: 8px;
  width: 100vw;
  max-width: 350px;
`;

const Title = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.02em;
  font-family: 'Poppins';
  margin: 0;
`;

const FormikContainer = styled(Form)`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Container = styled.div`
  line-height: 0;
  position: relative;
  display: block;
  width: 100%;
  margin-bottom: 0;
`;

const Input = styled(Field)`
  display: inline-block;
  width: 100%;
  padding: 18px 14px;

  color: ${({ theme }) => theme.palette.text.primary};
  background: inherit;
  border: 1px solid ${({ theme }) => theme.palette.text.info};
  border-radius: 8px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.palette.text.secondary};
    font-size: 14px;
  }

  &:focus {
    border-color: ${({ theme }) => theme.palette.text.hint};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.action?.focus || 'transparent'};
  }
`;

const Error = styled(ErrorMessage)`
  position: absolute;
  bottom: -8px;
  padding-left: 14px;
  margin: 0;
  color: var(--color-pastel);
  font-size: 12px;
  font-family: Poppins;
  font-weight: 500;
  letter-spacing: -0.36px;
`;

const Text = styled.p`
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.02em;
  margin: 0;
`;

const Icon = styled.svg`
  width: 18px;
  height: 18px;
  display: inline-block;
  overflow: visible;

  /* her zaman görünür */
  color: ${({ theme }) => theme.palette.text.primary};
  fill: currentColor;
  stroke: currentColor;

  will-change: transform, color, filter;
  transition: transform .18s ease, color .18s ease, filter .18s ease;
`;

const IconList = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
  align-items: center;
  gap: 8px;

  /* label'ları tıklanabilir ve erişilebilir yap */
  & > li > label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color .15s ease, box-shadow .15s ease, transform .15s ease;
  }

  & > li > label:hover {
    background-color: ${({ theme }) => theme.palette.action?.hover || 'transparent'};
  }

  /* Hover'da ikon hafif sallansın */
  & > li > label:hover ${Icon} {
    animation: ${hoverWobble} .35s ease;
  }

  & > li > label:focus-within {
    outline: 2px solid ${({ theme }) => theme.palette.action?.focus || 'transparent'};
    outline-offset: 2px;
  }
`;

const BgList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  max-width: 256px;

  & > li > label {
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
  }

  & > li > label:focus-within {
    outline: 2px solid ${({ theme }) => theme.palette.action?.focus || 'transparent'};
    outline-offset: 2px;
  }
`;

const Img = styled.img`
  border-radius: 6px;
  display: block;
  transition: transform .18s ease, outline-color .18s ease;
`;

const BgColor = styled.li`
  display: inline-block;
  padding: 0;
  height: 28px;
  width: 28px;
  margin: 2px;
  border-radius: 6px;
  border: none;
`;

const RadioField = styled(Field)`
  appearance: none;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;

  /* seçili olunca vurgu + pop */
  &:checked + ${Icon} {
    color: ${({ theme }) => theme.palette.primary.main};
    animation: ${selectPop} .22s cubic-bezier(.2,.8,.2,1);
    filter: drop-shadow(0 0 6px rgba(0,0,0,.06));
  }
`;

const RadioFieldBg = styled.input`
  appearance: none;
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
  pointer-events: none;

  &:checked + ${Img} {
    transform: scale(0.95);
    outline: 1px solid var(--color-green);
    outline-offset: 2px;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
`;

/* Hareketi azalt tercihine saygı */
export const ReducedMotionScope = styled.div`
  @media (prefers-reduced-motion: reduce) {
    ${Icon}, ${Img} {
      animation: none !important;
      transition: none !important;
    }
  }
`;

export {
  FormContainer,
  Container,
  Input,
  Error,
  Title,
  Text,
  Icon,
  Img,
  BgColor,
  IconList,
  BgList,
  RadioField,
  FormikContainer,
  RadioFieldBg,
  CloseButton,
};
