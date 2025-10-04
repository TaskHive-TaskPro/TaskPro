
//Header.jsx
import React, { useState, useContext } from "react";
import { Menu } from "lucide-react";
import UserInfo from "./UserInfo";
import { ThemeContext } from "../../context/ThemeContext";
import { useAuth } from "../../hooks/useAuth";
import logo from "../auth/assets/icon.png";
import styles from "./Header.module.css"; // 👈 önemli

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
      if (themeDropdownOpen && !event.target.closest(`.${styles.themeSelector}`)) {
        setThemeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [themeDropdownOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerLeft}>
          <button
            className={styles.sidebarToggleBtn}
            onClick={onSidebarToggle}
            aria-label="Sidebar'ı aç/kapat"
          >
            <Menu size={20} />
          </button>

          {/* <div className={styles.appBrand}>
            <div className={styles.appLogo}>
              <img src={logo} alt="TaskPro" />
            </div>
            <h1 className={styles.appTitle}>
              Task<span className={styles.brandAccent}>Pro</span>
            </h1>
          </div> */}
        </div>

        <div className={styles.headerRight}>
          {/* Theme Selector */}
          <div className={styles.themeSelector}>
            <button
              className={styles.themeButton}
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              aria-label="Tema seç"
              aria-expanded={themeDropdownOpen}
            >
              <span className={styles.themeText}>Theme</span>
            </button>

            {themeDropdownOpen && (
              <div className={styles.themeDropdown}>
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.value}
                    className={`${styles.themeOption} ${
                      theme === themeOption.value ? styles.active : ""
                    }`}
                    onClick={() => handleThemeChange(themeOption.value)}
                  >
                    <span>{themeOption.name}</span>
                    {theme === themeOption.value && (
                      <div className={styles.activeIndicator} />
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
