// HeaderDashboard.jsx
import React, { useState, useEffect } from "react";
import Styles from "./dashboard.module.css";
import themes from "./dashboardCss/theme.css";

// ---------------- Header ----------------
const HeaderDashboard = ({ title, user, onSelectPriority }) => {
  const themes = ["dark", "light", "turquoise"];
  const [currentTheme, setCurrentTheme] = useState("dark");
  const [showFilters, setShowFilters] = useState(false);

  // Body class güncelle
  useEffect(() => {
    // Önce tüm tema classlarını temizle
    themes.forEach((t) => document.body.classList.remove(`theme-${t}`));
    // Yeni temayı ekle
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  const handleChangeTheme = () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setCurrentTheme(nextTheme);
  };

  return (
    <>
      <header className={Styles.headerDashboard}>
        <div className={Styles.headerRight}>
          {/* Tema butonu */}
          <button className={Styles.btnTheme} onClick={handleChangeTheme}>
            Theme:{" "}
            {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
          </button>

          {/* Kullanıcı bilgisi */}
          {user && (
            <div className={Styles.userInfo}>
              <img
                src={user.avatar}
                alt={user.name}
                className={Styles.userAvatar}
              />
              <span className={Styles.userName}>{user.name}</span>
            </div>
          )}
        </div>
      </header>

      {showFilters && (
        <FiltersModal
          onClose={() => setShowFilters(false)}
          onSelectPriority={onSelectPriority}
        />
      )}
    </>
  );
};

export default HeaderDashboard;
