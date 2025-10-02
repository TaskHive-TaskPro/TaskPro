// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect, useMemo } from 'react';

// ↓ EKLENDİ: MUI ve styled-components ThemeProvider'ları
import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('taskpro-theme');
    if (savedTheme && ['light', 'dark', 'violet'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskpro-theme', theme);

    const root = document.documentElement;

    switch (theme) {
      case 'dark':
        root.style.setProperty('--bg-primary', '#1a1a1a');
        root.style.setProperty('--bg-secondary', '#2d2d2d');
        root.style.setProperty('--bg-tertiary', '#404040');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#b3b3b3');
        root.style.setProperty('--border-color', '#404040');
        root.style.setProperty('--accent-color', '#4f46e5');
        root.style.setProperty('--hover-color', '#374151');
        root.style.setProperty('--icon-filter', 'brightness(0) invert(1)');
        root.style.setProperty('--card-text-color', '#ffffff');
        root.style.setProperty('--card-text-secondary', '#b3b3b3');
        root.style.setProperty('--column-text-color', '#ffffff');
        root.style.setProperty('--add-another-color', '#4ade80');
        break;

      case 'violet':
        root.style.setProperty('--bg-primary', 'rgba(82, 85, 188, 1)');
        root.style.setProperty('--bg-secondary', 'rgba(236, 237, 253, 1)');
        root.style.setProperty('--bg-tertiary', '#ffffff');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e0e0ff');
        root.style.setProperty('--border-color', 'rgba(112, 115, 218, 1)');
        root.style.setProperty('--accent-color', '#ffffff');
        root.style.setProperty('--hover-color', 'rgba(72, 75, 178, 1)');
        root.style.setProperty('--icon-filter', 'brightness(0) invert(0)');
        root.style.setProperty('--card-text-color', '#1f2937');
        root.style.setProperty('--card-text-secondary', '#6b7280');
        root.style.setProperty('--column-text-color', 'rgba(82, 85, 188, 1)');
        root.style.setProperty('--add-another-color', 'rgba(82, 85, 188, 1)');
        break;

      default: // light
        root.style.setProperty('--bg-primary', '#ffffff');
        root.style.setProperty('--bg-secondary', '#f9fafb');
        root.style.setProperty('--bg-tertiary', '#f3f4f6');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#e5e7eb');
        root.style.setProperty('--accent-color', '#3b82f6');
        root.style.setProperty('--hover-color', '#f0f9ff');
        root.style.setProperty('--icon-filter', 'brightness(0) invert(0)');
        root.style.setProperty('--card-text-color', '#1f2937');
        root.style.setProperty('--card-text-secondary', '#6b7280');
        root.style.setProperty('--column-text-color', '#1f2937');
        root.style.setProperty('--add-another-color', '#4ade80');
        break;
    }

    document.body.className = `theme-${theme}`;
  }, [theme]);

  // ↓ EKLENDİ: styled-components ve MUI’nin okuyacağı tema nesnesi
  const muiTheme = useMemo(() => {
    if (theme === 'dark') {
      return createTheme({
        palette: {
          mode: 'dark',
          primary: { main: '#4f46e5', contrastText: '#111827', hint: '#4f46e5' },
          secondary: { main: '#22c55e', dark: '#ffffff', info: '#e5e7eb', warning: '#10b981', error: '#34d399' },
          text: { primary: '#ffffff', secondary: '#b3b3b3', disabled: '#9ca3af', hint: '#4f46e5', warning: '#22c55e', error: '#ef4444' },
          background: { default: '#1a1a1a', paper: '#2d2d2d', error: '#3f1d1d', disabled: '#404040', hint: '#525252' },
        },
      });
    }
    if (theme === 'violet') {
      return createTheme({
        palette: {
          mode: 'light',
          primary: { main: '#5255BC', contrastText: '#ECEDFD', hint: '#ffffff' },
          secondary: { main: '#5255BC', dark: '#1f2937', info: '#111827', warning: '#A5B4FC', error: '#7C3AED' },
          text: { primary: '#ffffff', secondary: '#e0e0ff', disabled: '#c7d2fe', hint: '#ffffff', warning: '#A5B4FC', error: '#EF4444' },
          background: { default: 'rgba(82,85,188,1)', paper: '#ECEDFD', error: '#EDE9FE', disabled: '#E0E7FF', hint: '#C7D2FE' },
        },
      });
    }
    // light
    return createTheme({
      palette: {
        mode: 'light',
        primary: { main: '#3b82f6', contrastText: '#eef2ff', hint: '#3b82f6' },
        secondary: { main: '#4ade80', dark: '#1f2937', info: '#98A2B3', warning: '#A3E635', error: '#10B981' },
        text: { primary: '#1f2937', secondary: '#6b7280', disabled: '#9ca3af', hint: '#3b82f6', warning: '#22c55e', error: '#ef4444' },
        background: { default: '#ffffff', paper: '#f9fafb', error: '#fef2f2', disabled: '#f3f4f6', hint: '#e5e7eb' },
      },
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {/* ↓ EKLENDİ: MUI + styled-components aynı temayı alsın */}
      <MuiThemeProvider theme={muiTheme}>
        <SCThemeProvider theme={muiTheme}>
          <CssBaseline />
          {children}
        </SCThemeProvider>
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
