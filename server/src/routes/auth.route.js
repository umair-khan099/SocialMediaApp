import { Router } from "express";
import { getMe, login, register } from "../controllers/auth.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/get-me" , isAuth , getMe)

export default authRouter;
