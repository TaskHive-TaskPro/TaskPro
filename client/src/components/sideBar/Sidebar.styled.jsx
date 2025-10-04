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

  fill: currentColor;
  stroke: currentColor;
  color: ${p => p.theme.palette.text.primary};

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

/* IconsBox'ı BoardItem'dan ÖNCE tanımla */
export const IconsBox = styled.div`
  position: absolute;
  top: 50%;
  right: 24px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
`;

export const BoardItem = styled.li`
  position: relative;
  direction: ltr;
  height: 61px;
  display: flex;
  align-items: center;

  /* Hover olduğunda IconsBox görünür */
  &:hover ${IconsBox} {
    opacity: 1;
    pointer-events: auto;
  }

  /* Active board'da her zaman görünür */
  &.active-board ${IconsBox} {
    opacity: 1;
    pointer-events: auto;
  }
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
  color: ${p => {
    // Violet tema için koyu mor
    if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
      return '#5255BC';
    }
    // Dark tema için açık gri
    if (p.theme.palette.mode === 'dark') {
      return '#9ca3af';
    }
    // Light tema için koyu gri
    return '#6b7280';
  }};
  transition: color 0.2s ease;
`;

export const Delete = styled.svg`
  width: 16px;
  height: 16px;
  display: inline-block;
  fill: currentColor;
  stroke: currentColor;
  color: ${p => {
    // Violet tema için koyu mor
    if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
      return '#5255BC';
    }
    // Dark tema için açık gri
    if (p.theme.palette.mode === 'dark') {
      return '#9ca3af';
    }
    // Light tema için koyu gri
    return '#6b7280';
  }};
  transition: color 0.2s ease;
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


export const IconBox = styled.div`
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
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.15);
    
    ${Edit} {
      color: ${p => {
        // Hover'da daha koyu renk
        if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
          return '#3d3f8a'; // Koyu violet
        }
        if (p.theme.palette.mode === 'dark') {
          return '#ffffff'; // Beyaz
        }
        return '#1f2937'; // Çok koyu gri
      }};
    }
  }

  &:active {
    transform: scale(0.95);
  }

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
  transition: transform 0.1s ease;

  &:hover {
    transform: scale(1.15);
    
    ${Delete} {
      color: ${p => {
        // Hover'da kırmızı tonu
        if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
          return '#dc2626'; // Kırmızı
        }
        if (p.theme.palette.mode === 'dark') {
          return '#ef4444'; // Açık kırmızı
        }
        return '#dc2626'; // Kırmızı
      }};
    }
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const CreateBoardButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => {
    // Violet temada açık violet
    if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
      return '#B8BCFD';
    }
    // Light ve Dark temalarda yeşil
    return 'rgba(190, 219, 176, 1)';
  }};
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${p => {
      // Violet temada koyu violet
      if (p.theme.palette.mode === 'light' && p.theme.palette.primary.main === '#5255BC') {
        return '#979CEA';
      }
      // Light ve Dark temalarda koyu yeşil
      return 'rgba(157, 200, 136, 1)';
    }};
  }

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
  }
`;

export const HelpButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${p => p.theme.palette.primary.main};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const LogoutButton = styled.button.attrs({ type: 'button' })`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:focus-visible {
    outline: 2px solid ${TEXT};
    outline-offset: 2px;
    border-radius: 4px;
  }
`;
