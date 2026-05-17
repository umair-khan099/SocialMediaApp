import mongoose from "mongoose";

const followSchema = new mongoose.Schema(
  {
    follower: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "follower is required"],
    },
    followee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: [true, "followee is required  "],
    },
  },
  { timestamps: true },
);

export const Follows = mongoose.model("follow", followSchema);
