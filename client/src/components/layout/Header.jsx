import React, { useState, useContext } from "react";
import { Menu } from "lucide-react";
import UserInfo from "./UserInfo";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import logo from "../auth/assets/icon.png";

const Header = ({ onSidebarToggle }) => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme || "light";
  const setTheme = themeContext?.setTheme || (() => {});
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { user } = useAuth();

  const themes = [
    { name: "Light", value: "light" },
    { name: "Dark", value: "dark" },
    { name: "Violet", value: "violet" },
  ];

  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    setThemeDropdownOpen(false);
  };

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeDropdownOpen && !event.target.closest(".theme-selector")) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeDropdownOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <button
            className="sidebar-toggle-btn"
            onClick={onSidebarToggle}
            aria-label="Sidebar'ı aç/kapat"
          >
            <Menu size={20} />
          </button>

          <div className="app-brand">
            <div className="app-logo">
              <img src={logo} alt="TaskPro" />
            </div>
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
              <span className="theme-text">Theme</span>
            </button>

            {themeDropdownOpen && (
              <div className="theme-dropdown">
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    className={`theme-option ${
                      theme === themeOption.value ? "active" : ""
                    }`}
                    onClick={() => handleThemeChange(themeOption.value)}
                  >
                    <span>{themeOption.name}</span>
                    {theme === themeOption.value && (
                      <div className="active-indicator" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Info */}
          <UserInfo />
        </div>
      </div>
    </header>
  );
};

export default Header;
