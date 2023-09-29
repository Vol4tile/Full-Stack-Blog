import React from "react";
import styles from ".//NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={styles.container}>
      Sanırım yolunuzu kaybettiniz. En iyisi <Link to="/">Anasayfa</Link> dönün.
    </div>
  );
};

export default NotFound;
