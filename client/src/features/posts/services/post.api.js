import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/post",
  withCredentials: true,
});

export const getPost = async () => {
  try {
    const response = await api.get("/getposts");
    return response.data;
  } catch (error) {
    throw error;
  }
};