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

const CONFIG = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
};

export default CONFIG;
