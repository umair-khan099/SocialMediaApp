import CONFIG from "../config/dotenv.config.js";
import { Post } from "../model/post.model.js";
import Imagekit, { toFile } from "@imagekit/nodejs";
import jwt from "jsonwebtoken";

const imagekit = new Imagekit({
  privateKey: CONFIG.IMAGEKIT_PRVT_KEY,
});
export const createPost = async (req, res) => {
  try {
    const caption = req.body.caption;
    const token = req.cookies.token;
    if (!token) {
      return res.this.status(400).json({
        message: " token not found Unauthorized Credentials",
      });
    }
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }
    const user = jwt.verify(token, CONFIG.JWT_SECRET);

    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file "),
      fileName: "Test",
      folder: "SocialMediaApp-Posts",
    });

    const post = await Post.create({
      caption,
      imageUrl: file.url,
      user: user.id,
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
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: " token not found Unauthorized Credentials",
      });
    }

    const user = jwt.verify(token, CONFIG.JWT_SECRET);
    const userId = user.id;
    const posts = await Post.find({ user: userId });

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
    const token = req.cookies.token;
    const postId = req.params.postId;

    if (!token) {
      return res.status(401).json({
        message: " token not found Unauthorized Credentials",
      });
    }

    const user = jwt.verify(token, CONFIG.JWT_SECRET);

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post Not found ",
      });
    }

    const isValidUser = post.user.toString() === user.id;

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
