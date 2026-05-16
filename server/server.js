import app from "./src/app.js";
import CONFIG from "./src/config/dotenv.config.js";
import { dnConnect } from "./src/config/db.config.js";

dnConnect();
app.listen(CONFIG.PORT, () => {
  console.log(`Server is running on PORT ${CONFIG.PORT}`);
});
