import React from "react";
import NotFoundCSS from "../css/NotFound.module.css";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className={NotFoundCSS.container}>
      Sanırım yolunuzu kaybettiniz. En iyisi <Link to="/">Anasayfa</Link> dönün.
    </div>
  );
};

export default NotFound;
