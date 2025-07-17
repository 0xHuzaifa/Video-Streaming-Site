import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";

const isLogin = asyncHandler((req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers.authorization;
    if (!token) {
      throw new ApiError(404, "Token not found");
    }
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token.split(" ")[1];
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRETE);
      req.user = decode;
      next();
    } catch (jwtError) {
      throw new ApiError(401, "Invalid token or token expired");
    }
  } catch (error) {
    next(error);
  }
});

export default isLogin;
