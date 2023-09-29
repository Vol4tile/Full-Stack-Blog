import React from "react";
import { useState } from "react";
import { Register } from "../../services/userService";
import styles from "../LoginPage/Login.module.css";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import * as Yup from "yup";

import { ToastContainer, toast } from "react-toastify";
const RegisterPage = () => {
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [registerErrorText, setRegisterErrorText] = useState("");
  const navigate = useNavigate();
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Bu alan boş bırakalamaz")
      .min(1, "En az 6 karakterden oluşmalı!")
      .max(16, "En fazla 16 karakter olmalı!"),
    password: Yup.string()
      .required("Şifre  boş bırakılamaz!")
      .min(8, "En az 8 karakterden oluşmalı!")
      .max(32, "En fazla 32 karakter olmalı!"),
    email: Yup.string()
      .required("email  boş bırakılamaz!")

      .email("email formatında olmalı"),
    fullname: Yup.string()
      .required("İsim  boş bırakılamaz!")
      .min(2, "En az 3 karakterden oluşmalı!")
      .max(30, "En fazla 30 karakter"),
  });
  const [buttonText, setButtonText] = useState("Kaydol");
  const handleSubmit = ({ username, password, email, fullname }) => {
    Register({ username, password, email, fullname })
      .then((res) => {
        toast.success(
          "Hesabınız oluşturuldu. Anasayfaya yönlendiriliyorsunuz.",
          {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        const interval = setInterval(() => {
          navigate("/Login");
          clearInterval(interval);
        }, 1500);
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast.error("Başka bir kullanıcı adıyla tekrar deneyiniz.", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRegisterErrorText(error.response.data?.message);
          setTimeout(() => {
            setRegisterErrorText("");
          }, 1500);
        } else {
          toast.error("İşlem başarısız", {
            position: "bottom-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setRegisterErrorText("Beklenmedik bir hata oluştu.");
          setTimeout(() => {
            setRegisterErrorText("");
          }, 1500);
        }
      });
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Formik
            validationSchema={schema}
            initialValues={{
              username: "",
              password: "",
              email: "",
              fullname: "",
            }}
            onSubmit={(values) => {
              // Alert the input values of the form that we filled
              handleSubmit(values);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <div className={styles.formContainer}>
                <h1>Kaydol</h1>
                <div className={styles.form}>
                  {/* Passing handleSubmit parameter tohtml form onSubmit property */}
                  <form noValidate onSubmit={handleSubmit}>
                    <label htmlFor="username">
                      <AiOutlineUser />

                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        placeholder="Kullanıcı adı giriniz."
                        id="username"
                        autoComplete="off"
                      />
                    </label>
                    {/* If validation is not passed show errors */}
                    <p className={styles.error}>
                      {touched.username && errors.username}
                    </p>
                    <label htmlFor="password">
                      <AiOutlineKey />
                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type={passwordToggle ? "text" : "password"}
                        name="password"
                        id="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        placeholder="Şifre giriniz."
                        autoComplete="off"
                      />
                      {passwordToggle ? (
                        <AiOutlineEyeInvisible
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setPasswordToggle(!passwordToggle);
                          }}
                        />
                      ) : (
                        <AiOutlineEye
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setPasswordToggle(!passwordToggle);
                          }}
                        />
                      )}
                    </label>
                    {/* If validation is not passed show errors */}
                    <p className={styles.error}>
                      {touched.password && errors.password}
                    </p>
                    <label htmlFor="fullname">
                      <AiOutlineUsergroupAdd />

                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type="text"
                        name="fullname"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.fullname}
                        placeholder="İsminizi giriniz."
                        id="fullname"
                        autoComplete="off"
                      />
                    </label>
                    {/* If validation is not passed show errors */}
                    <p className={styles.error}>
                      {touched.fullname && errors.fullname}
                    </p>

                    <label htmlFor="email">
                      <AiOutlineMail />

                      {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        placeholder="Mail adresinizi giriniz."
                        id="email"
                        autoComplete="off"
                      />
                    </label>
                    {/* If validation is not passed show errors */}
                    <p className={styles.error}>
                      {touched.email && errors.email}
                    </p>

                    {/* Click on submit button to submit the form */}
                    <button type="submit">Kaydol</button>
                    <p className={styles.error}>{registerErrorText}</p>
                    <span
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      {" "}
                      Zaten bir hesabın var mı ? &nbsp;{" "}
                      <Link to="/Login">giriş yap</Link>
                    </span>
                  </form>
                </div>
                <ToastContainer></ToastContainer>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
