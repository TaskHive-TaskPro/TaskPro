import React, { useState, useContext } from 'react';
import { Sun, Moon, Palette, Menu, User } from 'lucide-react';
import UserInfo from './UserInfo';
import { ThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const Header = ({ onSidebarToggle }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { user } = useAuth();

  const themes = [
    { name: 'Light', value: 'light', icon: Sun },
    { name: 'Dark', value: 'dark', icon: Moon },
    { name: 'Violet', value: 'violet', icon: Palette }
  ];

  const handleThemeChange = async (selectedTheme) => {
    try {
      setTheme(selectedTheme);
      setThemeDropdownOpen(false);
      

      const token = localStorage.getItem('token');
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/user/theme`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ theme: selectedTheme })
        });
      }
    } catch (error) {
      console.error('Tema güncellenirken hata:', error);

    }
  };

  const currentTheme = themes.find(t => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;


  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownOpen && !event.target.closest('.theme-selector')) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [themeDropdownOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          {/* Mobile/Desktop Menu Toggle */}
          <button 
            className="sidebar-toggle-btn"
            onClick={onSidebarToggle}
            aria-label="Sidebar'ı aç/kapat"
          >
            <Menu size={20} />
          </button>
          
          <div className="app-brand">
            <h1 className="app-title">
              Task<span className="brand-accent">Pro</span>
            </h1>
          </div>
        </div>

        <div className="header-right">
          {/* Theme Selector */}
          <div className="theme-selector">
            <button
              className="theme-button"
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              aria-label="Tema seç"
              aria-expanded={themeDropdownOpen}
            >
              <CurrentIcon size={18} />
              <span className="theme-text">{currentTheme.name}</span>
            </button>

            {themeDropdownOpen && (
              <div className="theme-dropdown">
                {themes.map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <button
                      key={themeOption.value}
                      className={`theme-option ${theme === themeOption.value ? 'active' : ''}`}
                      onClick={() => handleThemeChange(themeOption.value)}
                    >
                      <Icon size={16} />
                      <span>{themeOption.name}</span>
                      {theme === themeOption.value && (
                        <div className="active-indicator" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="user-info">
            <button className="user-info-btn">
              <User size={20} />
              <span>{user?.name || 'Kullanıcı'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;