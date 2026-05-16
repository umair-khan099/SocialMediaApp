import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  console.log("PORT is missing in .env");
  process.exit(1);
}
if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is missing in .env");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
    console.log("JWT_SECRET is missing in .env")
}
const CONFIG = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default CONFIG;
