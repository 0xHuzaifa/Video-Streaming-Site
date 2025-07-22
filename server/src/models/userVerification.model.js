import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import ApiError from "../utils/ApiError.js";

const userVerificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
    index: true,
  },

  verificationToken: {
    type: String,
  },

  verificationCode: {
    type: Number,
  },

  verificationExpireAt: {
    type: Date,
  },

  codeSentLimit: {
    type: Number,
    default: 0,
    select: true,
  },

  codeSentLimitResetTime: {
    type: Date,
    select: true,
  },
});

// Time To Live (TTL) index - automatically delete expire verification records
userVerificationSchema.index(
  { verificationExpireAt: 1 },
  { expireAfterSeconds: 0 }
);

userVerificationSchema.methods.generateVerificationCode = async function () {
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
    throw new ApiError(
      400,
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
  this.verificationCode = crypto
    .createHash("sha256")
    .update(verificationCode)
    .digest("hex");
  this.verificationExpireAt = new Date(Date.now() + 5 * 60 * 1000); // 5min expiry
  this.codeSentLimit = (parseInt(this.codeSentLimit) || 0) + 1; // increment code sent limit
  this.codeSentLimitResetTime = Date.now() + 10 * 60 * 1000; // 10min expiry
  await this.save();
  return verificationCode;
};

userVerificationSchema.methods.verifyCode = async function (token) {
  const currentTime = Date.now();

  if (!this.verificationExpireAt || currentTime > this.verificationExpireAt) {
    throw new Error("Verification link has expired. Please request a new one");
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const verify = this.verificationToken === hashedToken;
  if (!verify) {
    throw new Error("Invalid verification token");
  }
  this.verificationToken = undefined;
  this.verificationExpireAt = undefined;
  await this.save();
  return true;
};

userVerificationSchema.methods.generateVerificationToken = async function () {
  const currentTime = Date.now();
  // Check if reset time has passed
  if (
    this.codeSentLimitResetTime &&
    currentTime >= this.codeSentLimitResetTime
  ) {
    this.codeSentLimit = 0;
    this.codeSendLimitResetTime = null;
  }
  // Check if code sent limit is not reached
  if (this.codeSentLimit >= 3) {
    const remainingTimeMs = this.codeSentLimitResetTime - currentTime;
    const remainingTimeMin = Math.ceil(remainingTimeMs / (60 * 1000)); // convert to minutes
    throw new ApiError(
      400,
      `You have reached the limit. Please try again after ${remainingTimeMin} minutes.`
    );
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.verificationToken = hashedToken;
  this.verificationExpireAt = new Date(Date.now() + 5 * 60 * 1000); // 5min expiry
  this.codeSentLimit = (parseInt(this.codeSentLimit) || 0) + 1; // increment code sent limit
  this.codeSentLimitResetTime = Date.now() + 10 * 60 * 1000; // 10min expiry
  await this.save();
  return verificationToken;
};

userVerificationSchema.methods.verifyToken = async function (token) {
  const currentTime = Date.now();

  if (!this.verificationExpireAt || currentTime > this.verificationExpireAt) {
    throw new ApiError(
      498,
      "Verification link has expired. Please request a new one"
    );
  }

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const verify = this.verificationToken === hashedToken;
  if (!verify) {
    throw new ApiError(498, "Invalid verification token");
  }
  this.verificationToken = undefined;
  this.verificationExpireAt = undefined;
  await this.save();
  return true;
};

// Static method to clean up expired records (optional, since TTL index handles this)
userVerificationSchema.static.cleanupExpired = function () {
  return this.deleteMany({ verificationExpireAt: { $lt: new Date() } });
};

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);
export default UserVerification;
