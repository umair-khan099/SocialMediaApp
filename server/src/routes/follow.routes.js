import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import { followUser, unFollowUser } from "../controllers/follow.controller.js";

export const followRouter = Router();

followRouter.post("/follow/:userId", isAuth, followUser);
followRouter.post("/unfollow/:userId", isAuth, unFollowUser);
