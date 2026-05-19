import { Likes } from "../model/like.model.js";
import { Post } from "../model/post.model.js";

export const addLike = async (req, res) => {
  try {
    const userId = req.user;
    const postId = req.params.postId;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post not exist",
      });
    }

    const like = await Likes.create({
      user: userId,
      post: postId,
    });

    return res.status(201).json({
      message: `you have just liked ${post.caption}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somthing Went Wrong At addLike Controller",
    });
  }
};

export const unlike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user;
    const isPostExist = await Likes.findOne({ post: postId, user: userId });

    if (!isPostExist) {
      return res.status(404).json({
        message: "post is not found",
      });
    }

    const removeLike = await Likes.findByIdAndDelete({ _id: isPostExist._id });
    res.send("deleted");
  } catch (error) {}
};
