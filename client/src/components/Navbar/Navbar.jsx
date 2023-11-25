import React from "react";
import styles from "./Navbar.module.css";
import { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../actions/userData/user";
import { BiCodeAlt } from "react-icons/bi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {useTheme} from "../../context/ThemeContext"
import { FiSun, FiMoon } from "react-icons/fi";
import { AiOutlineUser, AiOutlineLogout, AiFillSetting } from "react-icons/ai";
import { RxTriangleUp } from "react-icons/rx";
import ToggleTheme from "../ToggleTheme/ToggleTheme";
const Navbar = () => {
  const userData = useSelector((state) => state.users);
  const { isDarkMode, toggleTheme } = useTheme();
  const iconRef = useRef(null);
  const wrapperRef = useRef(null);
  const [accountBarToggle, setAccountBarToggle] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setAccountBarToggle(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef, iconRef]);
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };
  return (
    <>
      <header className={isDarkMode ? styles.dark : null}>
        <nav>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending ? styles.pending : isActive ? styles.active : ""
            }
          >
            <BiCodeAlt size={24} />
          </NavLink>
          <div className={styles.navContainer}>
            <NavLink
              to="Posts"
              className={({ isActive, isPending }) =>
                isPending ? styles.pending : isActive ? styles.active : ""
              }
            >
              Paylaşımlar
            </NavLink>

            {userData.succes == true && userData.user && (
              <NavLink
                style={{ whiteSpace: "nowrap" }}
                to="CreatePost"
                className={({ isActive, isPending }) =>
                  isPending
                    ? styles.pending
                    : isActive
                    ? `${styles.active} ${styles.post}`
                    : styles.post
                }
              >
                Paylaşım Yap
              </NavLink>
            )}
            {userData.succes == true && userData.user && (
              <div className={styles.account} ref={iconRef}>
                <AiOutlineUser
                  size={24}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setAccountBarToggle(true);
                  }}
                ></AiOutlineUser>
                <motion.div
                  {...(accountBarToggle && {
                    animate: "show",
                    variants: container,
                    initial: "hide",
                  })}
                  ref={wrapperRef}
                  className={styles.accountNav}
                  style={{ display: accountBarToggle ? "block" : "none" }}
                >
                  {accountBarToggle && (
                    <>
                      <RxTriangleUp className={styles.triangle}></RxTriangleUp>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {" "}
                        <NavLink to="Account">
                          <label className={styles.accountMenus}>
                            <AiOutlineUser></AiOutlineUser>
                            Hesabım
                          </label>
                        </NavLink>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <NavLink to="Settings">
                          <label className={styles.accountMenus}>
                            <AiFillSetting></AiFillSetting>
                            Ayarlar
                          </label>
                        </NavLink>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className={styles.btn}
                        style={{
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          padding: "5px",
                          whiteSpace: "nowrap",
                        }}
                        onClick={() => {
                          dispatch(Logout());
                        }}
                      >
                        <AiOutlineLogout></AiOutlineLogout>
                        Çıkış Yap
                      </motion.div>
                    </>
                  )}
               
                </motion.div>
              </div>
            )}
            {((userData.succes === false && userData.user === null) ||
              userData.errorHandler == true) && (
              <Link to="Login">Giriş Yap</Link>
            )}
              <ToggleTheme/>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
