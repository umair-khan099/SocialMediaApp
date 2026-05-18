import CONFIG from "../config/dotenv.config.js";
import { Post } from "../model/post.model.js";
import Imagekit, { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { Likes } from "../model/like.model.js";

const imagekit = new Imagekit({
  privateKey: CONFIG.IMAGEKIT_PRVT_KEY,
});
export const createPost = async (req, res) => {
  try {
    const caption = req.body.caption;
    const userId = req.user;
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file "),
      fileName: "Test",
      folder: "SocialMediaApp-Posts",
    });

    const post = await Post.create({
      caption,
      imageUrl: file.url,
      user: userId,
    });

    return res.status(201).json({
      message: "post has created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somting Went Wrong At CreatePost controller",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const userId = req.user;
    const allPosts = await Post.find()
      .populate("user", "userName profileImage ")
      .lean();
    const posts = await Promise.all(
      allPosts.map(async (post) => {
        const isLiked = await Likes.findOne({
          post: post._id,
          user: userId,
        });

        return {
          ...post,
          isLiked: !!isLiked,
        };
      }),
    );

    if (!posts) {
      console.log("no posts");
    }

    return res.status(201).json({
      message: "featched all Posts",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somting Went Worng At getAllPoat controller",
    });
  }
};

export const getPostDetails = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post Not found ",
      });
    }

    const isValidUser = post.user.toString() === userId;

    if (!isValidUser) {
      return res.status(403).json({
        message: "Forbiden Content",
      });
    }
    return res.status(201).json({
      message: "fetch user post",
      post,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somting went wrong at getuserpost controller",
    });
  }
};
