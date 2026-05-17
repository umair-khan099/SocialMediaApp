import { Router } from "express";
import {
  createPost,
  getPostDetails,
  getPosts,
} from "../controllers/post.controller.js";
import multer from "multer";
const postRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost", upload.single("image"), createPost);
postRouter.get("/getposts", getPosts);
postRouter.get("/details/:postId", getPostDetails);
export default postRouter;
