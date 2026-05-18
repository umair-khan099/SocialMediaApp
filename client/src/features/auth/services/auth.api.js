import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const signUp = async (userName, email, password) => {
  const responce = await api.post("/register", { userName, email, password });
  return responce.data;
};

export const login = async (userInfo, password) => {
  const responce = await api.post("/login", {
    userName: userInfo,
    email: userInfo,
    password,
  });
  return responce.data;
};

export const getMe = async () => {
  const responce = api.get("/get-me");
  return responce.data;
};
