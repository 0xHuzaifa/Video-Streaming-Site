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

    watchHistory: [{
      type: Schema.Types.ObjectId,
      ref: "Video",
    }],

    isVerified: {
      type: Boolean,
      default: false,
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

const User = mongoose.model("User", userSchema);
export default User;
