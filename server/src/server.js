import dotenv from "dotenv";
import connectDB from "./database/db.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`MongoDB Connection Failed: ${error}`);
  });
