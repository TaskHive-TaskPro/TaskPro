import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/sideBar/SideBar";

export default function HomeLayout() {
  const [open, setOpen] = useState(false); // mobilde geçici drawer için

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* SideBar her zaman mount edilir; large ekranlarda 'permanent' drawer zaten görünür */}
      <SideBar active={open} onClick={() => setOpen(false)} />

      <main style={{ flex: 1, padding: 16 }}>
        {/* Basit bir hamburger; küçük ekranlarda sidebar'ı açar */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ marginBottom: 12 }}
        >
          ☰ Menu
        </button>

        <Outlet />
      </main>
    </div>
  );
}
