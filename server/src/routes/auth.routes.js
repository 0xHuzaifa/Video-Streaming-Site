import express from "express";
import {
  register,
  login,
  logout,
  verifyOTP,
  requestNewOTP,
} from "../controllers/auth.controller.js";
import isLogin from "../middlewares/isLogin.middleware.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Logout route
router.post("/logout", isLogin, logout);

// Verify-Email Token route
router.post("/verify-email/:userId/:verificationToken", verifyOTP);

// Verify-OTP route
router.post("/verify-otp", isLogin, verifyOTP);

// request New OTP
router.post("/request-otp", isLogin, requestNewOTP);

export default router;
