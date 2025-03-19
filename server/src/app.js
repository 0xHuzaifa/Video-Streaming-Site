import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// middlewares
app.use(cors()); // Enable CORS
app.use(express.json({ limit: "16kb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the public directory
app.use(cookieParser()); // Parse cookies


// routes

export { app }; // Export the express app
