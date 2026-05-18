import { User } from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CONFIG from "../config/dotenv.config.js";

export const register = async (req, res) => {
  try {
    const { userName, email, password, bio, profileImage } = req.body;

    const isUserAlreadyExist = await User.findOne({
      $or: [{ email }, { userName }],
    });
    if (isUserAlreadyExist) {
      return res.status(400).json({
        message:
          isUserAlreadyExist.email === email
            ? "User With this email already exist"
            : "User With this userName already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashPassword,
      bio,
      profileImage,
    });

    const token = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "user has register successfully ",
      user: { id: user._id, userName: user.userName },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somthing Went Wrong At Register Controller",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { userName }],
    });

    if (!user) {
      return res.status(400).json({
        message: "User is not Found  ",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalide Credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, CONFIG.JWT_SECRET, {
      expiresIn: "30m",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "Uswer has logedIn successfully ",
      user: { id: user._id, userName: user.userName },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Somting Went Wrong At Login Controller",
    });
  }
};

export const getMe = async (req ,res) =>{
  
}
