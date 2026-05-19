import { Router } from "express";
import {
  createPost,
  getPostDetails,
  getPosts,
} from "../controllers/post.controller.js";
import multer from "multer";
import { isAuth } from "../middlewares/auth.middleware.js";
const postRouter = Router();

const upload = multer({ storage: multer.memoryStorage() });

postRouter.post("/createpost", isAuth, upload.single("image"), createPost);
postRouter.get("/getposts", isAuth, getPosts);
postRouter.get("/details/:postId", isAuth, getPostDetails);

export default postRouter;
