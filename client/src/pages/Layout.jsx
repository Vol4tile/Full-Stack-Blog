import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useTheme } from "../context/ThemeContext";
const Layout = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <>
      <Navbar />
      <main className={isDarkMode ? 'dark' : null} >
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
