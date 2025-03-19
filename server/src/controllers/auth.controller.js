import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateTokens from "../utils/generateTokens.js";

const options = {
  httpOnly: true,
  secure: true,
};

const register = asyncHandler(async (req, res) => {
  const { username, fullname, email, password } = req.body;
  try {
    if (
      [username, fullname, email, password].some((field) => field.trim() === "")
    ) {
      throw new ApiError(400, "All fields are required");
    }

    const userExist = await User.findOne({ $or: [{ username }, { email }] });
    if (userExist) {
      throw new ApiError(400, "User already exist");
    }

    const newUser = await User.create({
      username,
      fullname,
      email,
      password,
    });

    const user = await User.exists(newUser._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(
        500,
        "something went wrong while registering a new user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, {}, "User Register Successfully"));
  } catch (error) {
    throw new ApiError(500, "something went wrong");
  }
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if ([email, password].some((field) => field.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid email or password");
    }
    const { accessToken, refreshToken } = await generateTokens(user._id);
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie(accessToken, options)
      .cookie(refreshToken, options)
      .json(new ApiResponse(200, { user: loggedInUser }, ""));
  } catch (error) {
    throw new ApiError(500, "something went wrong while login");
  }
});

const logout = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    await User.findByIdAndUpdate(
      user.Id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return res
    .status(200)
    .clearCookie(accessToken, options)
    .clearCookie(refreshToken, options)
    .json(new ApiResponse(200, {}, "User Logged out"))
  } catch (error) {
    throw new ApiError(500, "something went wrong while logout");
  }
});

export { register, login, logout };
