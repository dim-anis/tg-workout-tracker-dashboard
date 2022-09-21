import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const auth = useAuth();

  const refresh = async () => {
    const res = await axios.get("/refresh", { withCredentials: true });
    auth.signin((prev) => {
      return { ...prev, accessToken: res.data.accessToken };
    });
    return res.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
