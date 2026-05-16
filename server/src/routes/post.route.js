import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";

const postRouter = Router();

postRouter.post("/createpost", createPost);

export default postRouter;
