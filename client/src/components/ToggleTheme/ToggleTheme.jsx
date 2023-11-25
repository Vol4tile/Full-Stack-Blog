import React from "react";
import styles from "./ToggleTheme.module.css";
import {useTheme} from "../../context/ThemeContext"
import { FiSun, FiMoon } from "react-icons/fi";

const ToggleTheme = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div
      className={`${styles.btn} ${isDarkMode ? styles.darkMode : ""}`}
      onClick={toggleTheme}
    >
      <div className={styles.btnIndicator}>
        <div
          className={`${styles.btnIconContainer} ${
            isDarkMode ? styles.rotate : ""
          }`}
        >
          {isDarkMode ? (
            <FiMoon
              className={`${styles.btnIcon} ${styles.darkIcon} ${styles.rotate}`}
            />
          ) : (
            <FiSun
              className={`${styles.btnIcon} ${styles.rotate}`}
              color="rgb(203 173 0)"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ToggleTheme;
