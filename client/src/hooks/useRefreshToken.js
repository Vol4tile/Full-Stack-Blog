import { HTTP } from "../axios";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await HTTP.get("user/relogin", {
      withCredentials: true,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
