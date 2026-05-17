import jwt from "jsonwebtoken";
import CONFIG from "../config/dotenv.config.js";

export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required: No token provided",
      });
    }

    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Invalid token structure",
      });
    }

    req.user = decoded.id; // Or req.userId for clarity
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expired, please login again",
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: "Internal server error during authentication",
    });
  }
};