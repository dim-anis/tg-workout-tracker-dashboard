import { useState, createContext } from "react";
import axios from "../api/axios";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  function signin(newUser, callback) {
    setUser(newUser);
    if (callback) {
      callback();
    }
  }

  const signout = async () => {
    setUser(null);
    try {
      const res = await axios.get("/logout", { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  };

  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
