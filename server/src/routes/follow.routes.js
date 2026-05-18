import { Router } from "express";
import { isAuth } from "../middlewares/auth.middleware.js";
import {
  followUser,
  manageFollowRequest,
  unFollowUser,
} from "../controllers/follow.controller.js";

export const followRouter = Router();

followRouter.post("/follow/:userId", isAuth, followUser);
followRouter.post("/unfollow/:userId", isAuth, unFollowUser);
followRouter.post("/:status/:userId", isAuth, manageFollowRequest);
