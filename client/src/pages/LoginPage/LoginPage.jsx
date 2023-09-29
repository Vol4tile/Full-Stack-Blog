import { useEffect, useState } from "react";
import { GetUserData, GoogLogin } from "../../actions/userData/user";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineKey,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import styles from "./Login.module.css";
import { HTTP } from "../../services/api";
import { Formik } from "formik";
import * as Yup from "yup";
function LoginPage() {
  const [buttonText, setButtonText] = useState("Giriş Yap");
  const [loginErrorText, setLoginErrorText] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const [tryLogin, setTryLogin] = useState(false);
  const isLogin = useSelector((state) => state.users);
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
  });
  useEffect(() => {
    if (isLogin.succes) {
      navigate("/");
    } else {
      if (tryLogin) {
        setLoginErrorText("Giriş başarısız lütfen tekrar deneyin.");
        setTimeout(() => {
          setLoginErrorText("");
        }, 1500);
      }
      setButtonText("Giriş Yap");
    }
  }, [isLogin]);

  const dispatch = useDispatch();
  function handleSubmit({ username, password }) {
    setTryLogin(true);
    setButtonText("Giriş Yapılıyor...");
    dispatch(GetUserData({ username, password }));
    // Kullanıcının girdiği bilgileri sunucuya göndermek için HTTP isteği yapılır
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      const token = codeResponse.access_token;
      HTTP.post("user/google-login", { token }).then((res) => {
        dispatch(GoogLogin(res.data));
      });
    },
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Formik
            validationSchema={schema}
            initialValues={{ username: "", password: "" }}
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
                <h1>Giriş Yap</h1>
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
                    {/* Click on submit button to submit the form */}
                    <button type="submit">{buttonText}</button>
                    <p className={styles.error}>{loginErrorText}</p>
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
                      Eğer bir hesabın yoksa &nbsp;{" "}
                      <Link to="/Register">kaydol</Link>
                    </span>

                    <span
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "20px",
                      }}
                    >
                      Ya da
                    </span>

                    <button
                      className={styles.googleButton}
                      type="button"
                      onClick={() => login()}
                    >
                      Sign in with Google &nbsp;<FcGoogle size={20}></FcGoogle>
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
export default LoginPage;
