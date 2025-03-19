import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/ApiError";

const isLogin = asyncHandler((req, res, next) => {
    try {
        const token = req.cookie.accessToken || req.headers.authorization;
        if (!token) {
            throw new ApiError(404, "Token not found");
        }
        if (req.headers.authorization) {
            token.split(" "[1])
        }

        const decode = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRETE, (err, req, res) => {
            if (err) {
                throw new ApiError(401, "Invalid token or Token expired");
            } else {
                req.user = decode
            }
        });
        next()
    } catch (error) {
        throw new ApiError(500, "Something went wrong while authentication, is login login");
    }
})

export default isLogin