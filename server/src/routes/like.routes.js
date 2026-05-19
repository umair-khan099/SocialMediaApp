import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { addLike, unlike } from "../controllers/like.controller.js";

export const likeRouter = Router();

likeRouter.post("/like/:postId", isAuth, addLike);
likeRouter.post("/unlike/:postId", isAuth, unlike);
