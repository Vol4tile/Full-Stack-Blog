import { HTTP } from "../axios";

const login = (formData) => {
  return HTTP.post("/user/login", formData);
};

const getRelogin = () => {
  return HTTP.get("/user/relogin");
};
const getLogout = () => {
  return HTTP.get("/user/Logout");
};
const userService = {
  login,
  getRelogin,
  getLogout,
};

export default userService;
