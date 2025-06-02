import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username required"],
      unique: true,
      trim: true,
      lowercase: true,
      min: [3, "minimum 3 characters required"],
      max: [20, "maximum 20 characters are allowed"],
      index: true,
    },

    fullName: {
      type: String,
      required: [true, "fullName required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "password required"],
      min: [6, "minimum 6 characters required"],
      select: false,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dnanaysnp/image/upload/v1742406123/video_streaming/dto2i5xepwzuknt34aqg.jpg",
    },

    coverImage: {
      type: String,
    },

    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationCode: {
      type: Number,
      select: false,
    },

    verificationCodeExpire: {
      type: Date,
      select: false,
    },

    codeSentLimit: {
      type: Number,
      default: 0,
      select: false,
    },

    codeSentLimitResetTime: {
      type: Date,
      select: false,
    },

    refreshToken: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};

userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    {
      id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.JWT_ACCESS_TOKEN_SECRETE,
    { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY }
  );
  return accessToken;
};

userSchema.methods.generateRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_ACCESS_TOKEN_SECRETE,
    { expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY }
  );
  return refreshToken;
};

userSchema.methods.generateVerificationCode = async function () {
  const currentTime = Date.now();
  // Check if reset time has passed
  if (
    this.codeSentLimitResetTime &&
    currentTime >= this.codeSentLimitResetTime
  ) {
    this.codeSentLimit = 0;
    this.codeSentLimitResetTime = null;
  }

  // check if code sent limit is not reached
  if (this.codeSentLimit >= 3) {
    const remainingTimeMs = this.codeSentLimitResetTime - currentTime;
    const remainingTimeMin = Math.ceil(remainingTimeMs / (60 * 1000)); // convert to minutes
    throw new Error(
      `You have reached the limit. Please try again after ${remainingTimeMin} minutes.`
    );
  }

  // Generate a 5-digit code
  function generateFiveDigitCode() {
    const firstNumber = Math.floor(Math.random() * 9) + 1; // generate first number of code
    // generate remaining 4 numbers of code
    const remainingNumbers = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, 0);
    return firstNumber + remainingNumbers;
  }
  const verificationCode = generateFiveDigitCode();
  this.verificationCode = verificationCode;
  this.verificationCodeExpire = Date.now() + 10 * 60 * 1000; // 10min expiry
  this.codeSentLimit = (parseInt(this.codeSentLimit) || 0) + 1; // increment code sent limit
  this.codeSentLimitResetTime = Date.now() + 10 * 60 * 1000; // 10min expiry
  await this.save();
  return verificationCode;
};

const User = mongoose.model("User", userSchema);
export default User;
