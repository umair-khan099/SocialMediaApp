import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const signUp = async (userName, email, password) => {
  try {
    const response = await api.post("/register", { userName, email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (userInfo, password) => {
  try {
    const response = await api.post("/login", {
      userName: userInfo,
      email: userInfo,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await api.get("/get=me");
    return response.data;
  } catch (error) {
    throw error;
  }
};
