import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import dateToString from "../../utils/dateToSring";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { motion } from "framer-motion";
const SettingsPage = () => {
  const [state, setState] = useState(0);
  const user = useSelector((state) => state.users);
  const [fullname, setFullname] = useState("");
  const [mail, setMail] = useState("");
  const [errors, setErrors] = useState({});
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  const AxiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user.errorHandler) {
      navigate("/");
    }
  }, [user]);

  const fullNameSchema = yup
    .string()
    .required("İsim  boş bırakılamaz!")
    .min(2, "En az 2 karakterden oluşmalı!")
    .trim()

    .max(30, "En fazla 30 karakter");

  const oldPasswordSchema = yup
    .string()
    .required("Şifre  boş bırakılamaz!")
    .min(8, "En az 8 karakterden oluşmalı!")
    .max(32, "En fazla 32 karakter olmalı!");
  const newPasswordSchema = yup
    .string()
    .required("Yeni şifre  boş bırakılamaz!")
    .min(8, "En az 8 karakterden oluşmalı!")
    .max(32, "En fazla 32 karakter olmalı!");
  const emailSchema = yup
    .string()
    .required("email  boş bırakılamaz!")

    .email("email formatında olmalı");

  return (
    <div className={styles.container}>
      {user.succes && (
        <div className={styles.profile}>
          <div>
            <img
              src={`http://127.0.0.1:5000/${user.user?.foundUser?.profilePhoto}`}
              crossOrigin="true"
              alt="profilePhoto"
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                verticalAlign: "middle",
              }}
            />
          </div>
          <div>
            <h1>{user.user?.foundUser?.fullname}</h1>
            <h5>{user.user?.foundUser?.username}</h5>
            <h5>{user.user?.foundUser?.email}</h5>
            <h6>{dateToString(user.user?.foundUser?.createDate)}</h6>
          </div>
        </div>
      )}
      {user.succes && (
        <div className={styles.settings}>
          <div
            className={styles.btn}
            onClick={() => {
              setState(1);
            }}
          >
            İsim değiştir
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              setState(2);
            }}
          >
            Şifre değiştir
          </div>
          <div
            className={styles.btn}
            onClick={() => {
              setState(3);
            }}
          >
            Mail adresini değiştir
          </div>
        </div>
      )}
      <div>
        {state === 1 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className={styles.changer}
          >
            <div>
              {" "}
              <label>
                Yeni isim{" "}
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  onChange={(e) => {
                    setFullname(e.target.value);
                  }}
                />
              </label>
              {errors.fullname && (
                <div style={{ color: "red" }}>{errors.fullname}</div>
              )}
            </div>
            <div>
              {" "}
              <button
                className={styles.secondBtn}
                onClick={async () => {
                  try {
                    await fullNameSchema.validate(fullname);
                    const response = await AxiosPrivate.put(
                      "/user/changeFullname/" + fullname
                    );

                    if (response.status === 200) {
                      dispatch({
                        type: "changeFullname",
                        payload: fullname,
                      });
                      toast.success("İsim değiştirme başarılı.", {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setState(0);
                    }
                  } catch (err) {
                    setErrors({ fullname: err.message });
                    toast.error("İşlem başarısız!", {
                      position: "bottom-center",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }
                }}
              >
                Tamamla
              </button>
            </div>
          </motion.div>
        )}
        {state === 2 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className={styles.changer}
          >
            <div>
              {" "}
              <label>
                Parola{" "}
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword({ ...password, oldPassword: e.target.value });
                  }}
                />
              </label>
            </div>
            <div>
              {" "}
              <label>
                Yeni parola{" "}
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword({ ...password, newPassword: e.target.value });
                  }}
                />
              </label>
            </div>
            <div>
              {" "}
              <label>
                Yeni parola tekrarı{" "}
                <input
                  type="password"
                  onChange={(e) => {
                    setPassword({
                      ...password,
                      newPasswordAgain: e.target.value,
                    });
                  }}
                />
              </label>
            </div>
            {errors.password && (
              <div style={{ color: "red" }}>{errors.password}</div>
            )}
            <div>
              <button
                className={styles.secondBtn}
                onClick={async () => {
                  try {
                    await oldPasswordSchema.validate(password.oldPassword);
                    await newPasswordSchema.validate(password.newPassword);
                    await newPasswordAgainSchema.validate(
                      password.newPasswordAgain
                    );
                    if (password.newPassword !== password.newPasswordAgain) {
                      throw { message: "Yeni şifreler uyuşmuyor" };
                    }
                    const response = await AxiosPrivate.post(
                      "/user/changePassword",
                      { password }
                    );

                    if (response.status === 200) {
                      toast.success("Parola değiştirme başarılı.", {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setState(0);
                    }
                  } catch (err) {
                    if (err.response?.status === 501) {
                      return toast.error("Eski şifre hatalı!!!", {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                    setErrors({ password: err.message });
                    toast.error("İşlem başarısız!", {
                      position: "bottom-center",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }
                }}
              >
                Tamamla
              </button>
            </div>
          </motion.div>
        )}
        {state === 3 && (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            className={styles.changer}
          >
            <div>
              {" "}
              <label>
                Yeni email{" "}
                <input
                  type="text"
                  name=""
                  id=""
                  onChange={(e) => {
                    setMail(e.target.value);
                  }}
                />
              </label>
              {errors.email && (
                <div style={{ color: "red" }}>{errors.email}</div>
              )}
            </div>
            <div>
              {" "}
              <button
                className={styles.secondBtn}
                onClick={async () => {
                  try {
                    await emailSchema.validate(mail);
                    const response = await AxiosPrivate.put(
                      "/user/changeMail/" + mail
                    );

                    if (response.status === 200) {
                      dispatch({
                        type: "changeMail",
                        payload: mail,
                      });
                      toast.success("Mail değiştirme başarılı.", {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setState(0);
                    }
                  } catch (err) {
                    if (
                      err.response?.status === 404 ||
                      err.response?.status === 500
                    ) {
                      return toast.error("İşlem başarısız!", {
                        position: "bottom-center",
                        autoClose: 1500,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                    }
                    setErrors({ email: err.message });
                    toast.error("İşlem başarısız!", {
                      position: "bottom-center",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: false,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                  }
                }}
              >
                Tamamla
              </button>
            </div>
          </motion.div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SettingsPage;
