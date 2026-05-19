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

export const createPost = async (selectedImage, caption) => {
  const formData = new FormData();

  formData.append("image", selectedImage);
  formData.append("caption", caption);

  const response = await api.post("/createpost", formData);
  return response.data;
};
