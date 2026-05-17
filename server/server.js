import app from "./src/app.js";
import CONFIG from "./src/config/dotenv.config.js";
import { dbConnect } from "./src/config/db.config.js";

dbConnect();
app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on PORT ${CONFIG.PORT}`);
});
