import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imageUrl: {
    type: String,
    required: [true, "user id is required for creating a post"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export const Post = mongoose.model("post", postSchema);
