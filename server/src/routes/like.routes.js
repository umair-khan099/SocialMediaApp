import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { addLike } from "../controllers/like.controller.js";

export const likeRouter = Router();

likeRouter.post("/like/:postId", isAuth, addLike);
