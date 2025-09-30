
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
        root.style.setProperty('--icon-filter', 'brightness(0) invert(1)');
        root.style.setProperty('--card-text-color', '#ffffff');
        root.style.setProperty('--card-text-secondary', '#b3b3b3');
        root.style.setProperty('--column-text-color', '#ffffff');
        root.style.setProperty('--add-another-color', '#4ade80');
        break;
      
      case 'violet':
        root.style.setProperty('--bg-primary', 'rgba(82, 85, 188, 1)');
        root.style.setProperty('--bg-secondary', 'rgba(236, 237, 253, 1)'); // Açık mor kolon arka planı
        root.style.setProperty('--bg-tertiary', '#ffffff'); // Beyaz kartlar
        root.style.setProperty('--text-primary', '#ffffff'); // Ana yazı beyaz
        root.style.setProperty('--text-secondary', '#e0e0ff');
        root.style.setProperty('--border-color', 'rgba(112, 115, 218, 1)');
        root.style.setProperty('--accent-color', '#ffffff');
        root.style.setProperty('--hover-color', 'rgba(72, 75, 178, 1)');
        root.style.setProperty('--icon-filter', 'brightness(0) invert(0)'); // Violet temada ikonlar siyah olsun
        root.style.setProperty('--card-text-color', '#1f2937'); // Kart içi yazılar siyah
        root.style.setProperty('--card-text-secondary', '#6b7280'); // Kart açıklama yazıları gri
        root.style.setProperty('--column-text-color', 'rgba(82, 85, 188, 1)'); // Kolon yazıları mor
        root.style.setProperty('--add-another-color', 'rgba(82, 85, 188, 1)'); // Add another yazısı mor
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};