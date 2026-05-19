import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";
import { createPost, getPost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);
  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    const data = await getPost();
    setFeed(data.posts);
    setLoading(false);
  };

  const handleCreatePost = async (selectedImage, caption) => {
    setLoading(true);
    const data = await createPost(selectedImage, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);
  };

  useEffect(() => {
    handleGetFeed();
  }, []);
  return { loading, feed, post, handleGetFeed, handleCreatePost };
};
