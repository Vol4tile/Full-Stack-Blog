const initialState = { user: null, errorHandler: null, succes: null };

const userReducer = (users = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "login":
      return { user: payload, succes: true };

    case "Logout":
      return { user: null, succes: payload };
    case "changeFullname":
      return {
        ...users,
        user: {
          ...users.user,
          foundUser: { ...users.user.foundUser, fullname: payload },
        },
      };
    case "changeMail":
      return {
        ...users,
        user: {
          ...users.user,
          foundUser: { ...users.user.foundUser, email: payload },
        },
      };
    case "loginError":
      return { errorHandler: payload };

    default:
      return users;
  }
};

export default userReducer;
