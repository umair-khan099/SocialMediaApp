import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: [true, "User Name Already Exist"],
      required: [true, "User Name is Required"],
    },

    email: {
      type: String,
      unique: [true, "Email Already Exist"],
      required: [true, "Email is Required"],
    },

    password: {
      type: String,
      required: [true, "Password is Required  "],
    },

    bio: {
      type: String,
    },

    profileImage: {
      type: String,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("user", userSchema);
