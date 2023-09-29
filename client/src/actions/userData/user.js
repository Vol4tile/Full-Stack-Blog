import userDataService from "../../services/userService";
export const GetUserData = (title) => async (dispatch) => {
  try {
    const res = await userDataService.Login(title);
    dispatch({
      type: "login",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "loginError",
      payload: true,
    });
  }
};
export const relogin = () => async (dispatch) => {
  try {
    const res = await userDataService.GetRelogin();
    dispatch({
      type: "login",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "loginError",
      payload: true,
    });
  }
};
export const Logout = () => (dispatch) => {
  const res = userDataService.GetLogout();
  dispatch({ type: "Logout", payload: false });
  dispatch({
    type: "loginError",
    payload: true,
  });
};
export const GoogLogin = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "login",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "loginError",
      payload: true,
    });
  }
};
