// src/components/sideBar/Sidebar.styled.jsx
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/material';

/* Sabit palet */
const TEXT = '#161616';
const TEXT_DISABLED = '#9AA4B2';
const PAPER = '#FCFCFC';
const HOVER_BG = 'rgba(22,22,22,0.06)';
const SCROLL_TRACK = 'rgba(0,0,0,0.06)';
const SCROLL_THUMB = '#BEDBB0';
const ACCENT = '#BEDBB0';    // active sağ şerit
const MINT = '#BEDBB0';

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
  color: ${TEXT};
`;

export const PlusIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: inline-block;
  fill: #FCFCFC;
  stroke: #FCFCFC;
  color: ${MINT};
`;

export const HelpIcon = styled.svg`
  width: 20px;
  height: 20px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: #161616;
`;

export const LogoutIcon = styled.svg`
  width: 32px;
  height: 32px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${TEXT};
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

  direction: rtl;

  &::-webkit-scrollbar {
    background-color: ${SCROLL_TRACK};
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${SCROLL_THUMB};
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
  color: ${TEXT_DISABLED};
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
  color: ${TEXT_DISABLED};
  transition: color 200ms linear, background-color 200ms linear;
  text-decoration: none;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover,
  &:focus {
    background-color: ${HOVER_BG};
  }

  &.active {
    pointer-events: none;
    background-color: ${HOVER_BG};

    ${Title} {
      width: 140px;
      color: ${TEXT};
    }
    ${IconTitle} {
      color: ${TEXT};
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
    background: ${ACCENT};
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
  color: #161616;
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
    outline: 2px solid ${TEXT};
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
    outline: 2px solid ${TEXT};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
