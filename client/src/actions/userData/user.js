import userDataService from "../../services/userService";
export const getUserData = (title) => async (dispatch) => {
  try {
    const res = await userDataService.login(title);

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
    const res = await userDataService.getRelogin();

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
  const res = userDataService.getLogout();

  dispatch({ type: "Logout", payload: false });
  dispatch({
    type: "loginError",
    payload: true,
  });
};
export const googLogin = (data) => async (dispatch) => {
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
