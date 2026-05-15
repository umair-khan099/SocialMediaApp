import mongoose from "mongoose";
import CONFIG from "./dotenv.config";

export const dnConnect = async () => {
  try {
    if (!CONFIG.MONGO_URI) {
      console.log("MONGO_URI is not found");
      process.exit(1);
    }
    await mongoose.connect(CONFIG.MONGO_URI);
    console.log("Db is connected");
  } catch (error) {
    console.log("DB connection failed:", error);
    process.exit(1);
  }
};
