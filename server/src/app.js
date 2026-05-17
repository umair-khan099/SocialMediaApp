import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
export default app;
