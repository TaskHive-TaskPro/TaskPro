
import React, { createContext, useState, useEffect } from 'react';

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
        break;
      
      case 'violet':
        root.style.setProperty('--bg-primary', '#f3f4f6');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--bg-tertiary', '#f9fafb');
        root.style.setProperty('--text-primary', '#1f2937');
        root.style.setProperty('--text-secondary', '#6b7280');
        root.style.setProperty('--border-color', '#d1d5db');
        root.style.setProperty('--accent-color', '#8b5cf6');
        root.style.setProperty('--hover-color', '#f3e8ff');
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
        break;
    }
    

    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};