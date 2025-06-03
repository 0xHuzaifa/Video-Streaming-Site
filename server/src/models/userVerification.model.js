import mongoose, { Schema } from "mongoose";
import crypto from "crypto";

const userVerificationSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  verificationLink: {
    type: Number,
    select: false,
  },

  verificationCode: {
    type: Number,
    select: false,
  },

  verificationExpireAt: {
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
});

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

userVerificationSchema.methods.generateVerificationToken = async function () {
  const verificationToken = crypto.randomBytes(32).toString("hex");
  const token = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");
  this.verificationLink = token;
  await this.save();
  return token;
};

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);
export default UserVerification;
