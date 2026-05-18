import { useState } from "react";
import { createContext } from "react";
import { getMe, login, signUp } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (userInfo, password) => {
    setLoading(true);
    try {
      const responce = await login(userInfo, password);
      setUser(responce);
      return responce;
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (userName, email, password) => {
    setLoading(true);
    try {
      const responce = await signUp(userName, email, password);
      setUser(responce.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleSignUp }}>
      {children}
    </AuthContext.Provider>
  );
};
