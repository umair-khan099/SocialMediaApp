import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // multiple origins
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // explicit methods
    allowedHeaders: ["Content-Type", "Authorization"], // explicit headers
  }),
);

import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import { followRouter } from "./routes/follow.routes.js";
import { likeRouter } from "./routes/like.routes.js";

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/send", followRouter);
app.use("/api/send", likeRouter);
export default app;
