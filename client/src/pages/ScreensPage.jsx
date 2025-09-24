import React, { useState } from "react";
import { useParams } from "react-router-dom";
import HeaderDashboard from "../components/dashboard/HeaderDashboard";
import MainDashboard from "../components/dashboard/MainDashboard";

const ScreensPage = () => {
  const { boardId } = useParams();
  const [bgColor, setBgColor] = useState("#111");

  return (
    <div className="screens-page" style={{ backgroundColor: bgColor }}>
      <HeaderDashboard title={`Board ${boardId}`} onChangeBackground={setBgColor} />
      <MainDashboard />
    </div>
  );
};

export default ScreensPage;
