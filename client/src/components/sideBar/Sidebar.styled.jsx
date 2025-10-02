// src/components/sideBar/Sidebar.styled.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

export const SideBarStyled = styled(Box)`
  position: fixed;
  height: 100%;
  width: 225px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 14px;

  @media screen and (min-width: 768px) {
    width: 100%;
    max-width: 260px;
    padding: 24px;
    overflow-x: hidden;
  }
`;

export const Thumb = styled.div`
  display: flex;
  flex-direction: column;
`;

export const NeedHelpBox = styled(Box)`
  padding: 20px;
  border-radius: 8px;
`;

export const Picture = styled.picture`
  display: flex;
  height: 75px;
`;

/* ===== SVG'ler: currentColor kullan ===== */
export const LogoIcon = styled.svg`
  width: 32px;
  height: 32px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.text.primary};
`;

export const PlusIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.secondary.info};
`;

export const HelpIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.text.primary};
`;

export const LogoutIcon = styled.svg`
  width: 32px;
  height: 32px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.text.primary};
`;

export const BoardsContainer = styled.div`
  position: relative;
`;

export const BoardsList = styled.ul`
  position: relative;
  width: 120%;
  top: 0;
  left: -24px;
  gap: 4px;

  list-style: none;
  margin: 0;
  padding: 0;

  max-height: 122px;
  overflow-y: auto;

  /* scrollbar'ı sağda göstermek için rtl hilesi */
  direction: rtl;

  &::-webkit-scrollbar {
    background-color: ${p => p.theme.palette.background.disabled};
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${p => p.theme.palette.background.hint};
  }

  @media screen and (min-width: 768px) {
    width: 123%;
  }
`;

export const BoardItem = styled.li`
  position: relative;
  direction: ltr;
  height: 61px;
  display: flex;
  align-items: center;
`;

export const IconTitle = styled.svg`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.text.disabled};
`;

export const Title = styled.div`
  width: 200px;
  text-align: left;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 500;
  line-height: normal;
`;

export const Edit = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 8px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: inherit;
`;

export const Delete = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: inherit;
`;

export const BoardLink = styled(NavLink)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 24px 20px;

  font-size: 14px;
  color: ${p => p.theme.palette.text.disabled};
  transition: color 200ms linear, background-color 200ms linear;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus {
    background-color: ${p => p.theme.palette.primary.contrastText};
  }

  &.active {
    pointer-events: none;
    background-color: ${p => p.theme.palette.primary.contrastText};

    ${Title} {
      width: 140px;
      color: ${p => p.theme.palette.secondary.dark};
    }
    /* currentColor kullandığımız için color'ı değiştiriyoruz */
    ${IconTitle} {
      color: ${p => p.theme.palette.secondary.dark};
    }
    ${Edit}, ${Delete} {
      pointer-events: auto;
    }
  }

  &.active::after {
    position: absolute;
    top: 0;
    right: 1px;
    content: '';
    width: 4px;
    height: 100%;
    border-radius: 4px 0 0 4px;
    background: ${p => p.theme.palette.text.warning};
  }
`;

export const IconsBox = styled.div`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.theme.palette.text.disabled};
`;

export const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* button reset + type güvenliği */
export const IconButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const IconLink = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
