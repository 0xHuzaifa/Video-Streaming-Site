import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// middlewares
app.use(cors()); // Enable CORS
app.use(express.json({ limit: "16kb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the public directory
app.use(cookieParser()); // Parse cookies

// import routes
import authRoutes from "./routes/auth.routes.js";

// routes
app.use("/api/v1/auth", authRoutes);

// error handler
app.use(errorHandler);
export { app }; // Export the express app
