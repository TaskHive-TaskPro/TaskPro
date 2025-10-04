import { Outlet } from "react-router-dom";
import { useState } from "react";
import SideBar from "../components/sideBar/SideBar";

export default function HomeLayout() {
  const [open, setOpen] = useState(false); // mobilde geçici drawer için

  return (
    <div >
      {/* SideBar her zaman mount edilir; large ekranlarda 'permanent' drawer zaten görünür */}
      <SideBar active={open} onClick={() => setOpen(false)} />

      <main >
        {/* Basit bir hamburger; küçük ekranlarda sidebar'ı açar */}
        <button
          type="button"
          onClick={() => setOpen(true)}
        
        >
          ☰ Menu
        </button>

        <Outlet />
      </main>
    </div>
  );
}
