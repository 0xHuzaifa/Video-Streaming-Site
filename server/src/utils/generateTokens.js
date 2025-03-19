import User from "../models/user.model";
import ApiError from "./ApiError";

const generateTokens = async (id) => {
  try {
    const user = await User.findById(id);
    const { accessToken } = user.generateAccessToken();
    const { refreshToken } = user.generateRefreshToken();
    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong while generating tokens");
  }
};

export default generateTokens;
