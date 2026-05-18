import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const signUp = async (userName, email, password) => {
  try {
    const responce = await api.post("/signup", { userName, email, password });
  } catch (error) {
    throw err;
  }
};

export const login = async (userInfo, password) => {
  try {
    const responce = api.post("/login", {
      userName: userInfo,
      email: userInfo,
      password,
    });
  } catch (error) {
    throw err;
  }
};
