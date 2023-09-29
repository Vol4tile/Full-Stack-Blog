import { HTTP } from "./api";

export const Register = async (formData) =>
  await HTTP.post("/user/register", formData);

const Login = (formData) => {
  return HTTP.post("/user/login", formData);
};

const GetRelogin = () => {
  return HTTP.get("/user/relogin");
};
const GetLogout = () => {
  return HTTP.get("/user/Logout");
};
const userService = {
  Register,
  Login,
  GetRelogin,
  GetLogout,
};

export default userService;
