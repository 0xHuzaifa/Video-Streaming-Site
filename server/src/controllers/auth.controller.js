// Utils
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateTokens from "../utils/generateTokens.js";
import sendEmail from "../utils/sendEmail.js";

// Models
import User from "../models/user.model.js";

// Helper - Email Templates
import emailVerificationTemplate from "../helper/emails-templates/emailVerificationLink.js";
import passwordChangeTemplate from "../helper/emails-templates/passwordChangeTemplate.js";
import accountDeleteTemplate from "../helper/emails-templates/accountDeleteTemplate.js";
import UserVerification from "../models/userVerification.model.js";

const options = {
  httpOnly: true,
  secure: true,
};

const generateVerificationLink = async (userId, fullName, email) => {
  try {
  const user = await UserVerification.findOneAndUpdate(
    {userId},                       // search criteria
    {userId},                       // update document
    {
      upsert: true,                 // create if doesn't exist
      new: true,                    // return updated document
      setDefaultsOnInsert: true,    // apply schema defaults if new doc
    }
  );

    const verificationToken = await user.generateVerificationToken();
    const url = `${process.env.FRONT_END_URL}/verify-email/${userId}/${verificationToken}`;

    // generate verification email template with verification code
    const message = emailVerificationTemplate(url, fullName);

    // send email to the user
    const result = await sendEmail({
      email,
      subject: "Email Verification",
      message,
    });

    // if email not sent successfully return
    if (!result) {
      throw new ApiError(
        400,
        "Something went wrong while sending verification email :("
      );
    }

    return true;
  } catch (error) {
    throw new ApiResponse(
      error.statusCode || 500,
      error.message || "error while sending verification email"
    );
  }
};

/**
 * Register function will register a new user.
 * It will check if the user already exists with the same username or email.
 * If the user does not exist, it will create a new user and send a verification email.
 * Verification email will contain a link with a token to verify the email.
 */
const register = asyncHandler(async (req, res, next) => {
  const { username, fullName, email, password } = req.body;

  // check fields are not empty
  const emptyFields = [
    { field: "username", value: username },
    { field: "fullName", value: fullName },
    { field: "email", value: email },
    { field: "password", value: password },
  ]
    .filter((item) => item.value?.trim() === "")
    .map((item) => item.field);
  if (emptyFields.length > 0) {
    throw new ApiError(400, "Missing required field", [emptyFields.join(", ")]);
  }

  // find user
  const userExist = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  // if user exist with the username or email, return
  if (userExist) {
    throw new ApiError(400, "User already exist");
  }

  // create new user
  const newUser = await User.create({
    username,
    fullName,
    email,
    password,
  });

  const result = await generateVerificationLink(
    newUser._id,
    newUser.fullName,
    newUser.email
  );
  if (!result) {
    return ApiError(
      500,
      "Something went wrong while creating verification link"
    );
  }

  return res.status(200).json(new ApiResponse(200, "Verification Email sent."));
});

const login = asyncHandler(async (req, res, next) => {
  const { nameOrEmail, password } = req.body;

  // check fields are not empty
  if ([nameOrEmail, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // find user
  const user = await User.findOne({
    $or: [{ username: nameOrEmail }, { email: nameOrEmail }],
  }).select("+password");

  // check, if user exists or not, and also compare password
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(400, "Invalid email or password");
  }

  // check, if user is not verified, than generate a verification code and send email
  if (user.isVerified === false) {
    const result = generateVerificationLink(user._id, user.fullName, user.email);
    if (!result) {
      throw new ApiError(
        400,
        "Something went wrong while creating verification email :("
      );
    }

    return res.status(200).json(
      new ApiResponse(200, "Verification Email sent.")
    )
  }

  const loggedInUser = await User.findById(user._id);
  
  const { accessToken, refreshToken } = await generateTokens(user._id);
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "Login successful", {
        loggedInUser,
      })
    );
});

const logout = asyncHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
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
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User Logged out"));
});

/**
 * verifyEmail function will verify the email of the user.
 * It will check if the user exists or not, and also check if the verification token is valid.
 * If the user exists and the verification token is valid, it will mark the user as verified.
 */
const verifyEmail = asyncHandler(async (req, res, next) => {
  const { userId, verificationToken } = req.params;

  if (!userId && !verificationToken) {
    throw new ApiError(400, "Invalid verification link");
  }

  // find the user
  const user = await User.findById(userId);

  // check, if user exist or not
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  if (user.isVerified) {
    new ApiResponse(200, "Email Already Verified");
  }

  // Find verification record
  const userVerification = await UserVerification.findOne({ userId: userId });

  if (!userVerification) {
    throw new ApiError(404, "Verification record not found!");
  }

  try {
    // verify the token using verifyToken method of userVerification schema
    await userVerification.verifyToken(verificationToken);

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "Email Verified Successfully"));
  } catch (error) {
    console.error("Verification error:", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Something went wrong while verifying link"
    );
  }
});

/**
 * verify OTP function will verify the otp sent to the user email.
 * It will check if the otp is valid and not expired.
 * If the otp is valid, it will remove the otp and expiry from the user database and save it.
 */
const verifyOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const { otp } = req.body;

  // check fields are not empty
  const emptyFields = [
    { field: "email", value: email },
    { field: "OTP", value: otp },
  ]
    .filter((item) => item.value?.trim() === "")
    .map((item) => item.field);

  if (emptyFields.length > 0) {
    throw new ApiError(400, "Missing required field", [emptyFields.join(", ")]);
  }

  // find the user
  const user = await User.findOne({ email }).select(
    "+verificationCode +verificationCodeExpire"
  );

  // check, if user exist or not
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // get the current time
  const currentTime = Date.now();
  // get the verification-code expiry time
  const codeExpiry = user.verificationCodeExpire.getTime();

  // check, if current time is more than code expiry time, OTP Expire
  if (currentTime >= codeExpiry) {
    throw new ApiError(403, "OTP Expire!");
  }

  // check, if user verification code equal to OTP, if not throw error
  if (user.verificationCode !== Number(otp)) {
    throw new ApiError(400, "Invalid OTP!");
  }

  /**
   * OTP is valid, and user is verified
   * Now remove verification code and expiry from user database and save
   */
  user.verificationCode = null;
  user.verificationCodeExpire = null;
  user.save({ validateModifiedOnly: true });

  /**
   * if OTP is generated for new user or unVerified user below condition will trigger.
   * if OTP is generated for change password or delete account below condition will not be trigger.
   */
  if (!user.isVerified) {
    user.isVerified = true;
    user.save({ validateModifiedOnly: true });
    // const { accessToken, refreshToken } = await generateTokens(user._id);

    // res
    //   .status(200)
    //   .cookie("accessToken", accessToken, options)
    //   .cookie("refreshToken", refreshToken, options)
    //   .json(new ApiResponse(200, "Login successful", { user }));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "OTP Verified Successfully"));
});

/**
 * requestNewOTP function will generate new OTP for the user.
 * It will check if the user is exist or not, and also check the reason for generating OTP.
 * It will only generate 3 OTP with in 10mints.
 */
const requestNewOTP = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const { reason } = req.body;

  // check fields are not empty
  const emptyFields = [
    { field: "email", value: email },
    { field: "Reason", value: reason },
  ]
    .filter((item) => item.value?.trim() === "")
    .map((item) => item.field);
  if (emptyFields.length > 0) {
    throw new ApiError(400, "Missing required field", [emptyFields.join(", ")]);
  }

  // find the user
  const user = await User.findOne({ email }).select("+codeSentLimit");
  // check, if user exist or not
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // generate verification code and code expiry and save
  const verificationCode = user.generateVerificationCode();
  await user.save();

  // Declare variables outside switch
  let emailSubject;
  let emailTemplate;
  // check the reason to generate OTP the OTP to generate particular email template
  switch (reason) {
    case "Email Verification":
      emailSubject = "Email Verification Code";
      emailTemplate = emailVerificationTemplate(verificationCode);
      break;

    case "Password Change":
      emailSubject = "Password Change Verification Code";
      emailTemplate = passwordChangeTemplate(verificationCode);
      break;

    case "Account Delete":
      emailSubject = "Account Delete Verification Code";
      emailTemplate = accountDeleteTemplate(verificationCode);
      break;

    default:
      throw new ApiError(400, "Invalid reason provided");
  }

  const result = await sendEmail({
    email: user.email,
    subject: emailSubject,
    message: emailTemplate,
  });

  if (!result) {
    throw new ApiError(
      400,
      "Something went wrong while sending verification email :("
    );
  }
  return res.status(200).json(new ApiResponse(200, "New OTP sent"));
});

export { register, login, logout, verifyOTP, requestNewOTP, verifyEmail };
