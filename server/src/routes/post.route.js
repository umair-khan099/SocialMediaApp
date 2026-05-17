import { Router } from "express";
import {
  createPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import multer from "multer";
const postRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost", upload.single("image"), createPost);
postRouter.get("/getposts", getPosts);
postRouter.get("/getuserpost/:postId", getUserPosts);
export default postRouter;
