// ScreensPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import MainDashboard from "../components/dashboard/MainDashboard";
import styles from "./ScreensPage.module.css"; // CSS Modules import

const ScreensPage = () => {
  const { boardId } = useParams();
  const [bgColor, setBgColor] = useState("#111");

  return (
    <div className={styles.screensPage} style={{ backgroundColor: bgColor }}>
      <HeaderDashboard
        title={`Board ${boardId}`}
        onChangeBackground={setBgColor}
        className={styles.headerDashboard} // opsiyonel
      />
      <MainDashboard className={styles.mainDashboard} />
    </div>
  );
};

export default ScreensPage;
