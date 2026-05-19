import { createContext } from "react";
import { getMe, login, signUp } from "./services/auth.api";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (userInfo, password) => {
    setLoading(true);
    try {
      const response = await login(userInfo, password);
      setuser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (userName, email, password) => {
    setLoading(true);
    try {
      const response = await signUp(userName, email, password);
      setuser(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const response = await getMe();
      setuser(response.data);
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
