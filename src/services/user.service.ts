import userModel, { IUser } from "../models/user.model";
import { comparePassword, hashPassword } from "../guards/user.guards";
import crypto from "crypto";
import { sendVerifcationEmail } from "../helpers/sendVerificationEmail";
import { createJwt } from "../guards/user.guards";

export const createUser = async (userData: IUser) => {
  try {
    // check if email doesn't exist before registration
    const existingUser = await userModel.findOne({ email: userData.email });

    // If user already exists but not verified → resend verification token
    if (existingUser && !existingUser.isVerified) {
      const newToken = crypto.randomBytes(32).toString("hex");
      existingUser.verificationToken = newToken;
      existingUser.verificationTokenExpires = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      ); // 24h

      await existingUser.save();
      await sendVerifcationEmail(existingUser.email, newToken);

      return {
        error: null,
        data: null,
        message:
          "Account already exists but not verified. A new verification link has been sent.",
      };
    }
    // if user registed and verified.this blocks new registration
    if (existingUser) {
      return { error: "email already exists", data: null };
    }

    // hash password
    const password = hashPassword(userData.password);

    // generate verifcation token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // create a new user
    const newUser = new userModel({
      ...userData,
      password,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      isVerified: false,
    });

    // saving new user
    const savedUser = await newUser.save();

    // send verification email
    await sendVerifcationEmail(savedUser.email, verificationToken);

    return {
      error: null,
      data: savedUser,
      message: "user registered, check email to verify",
    };
  } catch (error) {
    return { error: "registration failed", data: null };
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    //  find user by email first
    const user = await userModel.findOne({ email });
    if (!user) {
      return { error: "user doesn't exist", data: null };
    }

    // is user verified

    if (!user.isVerified) {
      return {
        error: "Kindly verify your email before logging in",
        data: null,
      };
    }

    // verify passord match
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return { error: "invalid email or password", data: null };
    }

    // createJwt
    const token = createJwt({
      id: user.id,
      email: user.email,
    });

    return { error: null, data: token, message: "sign in successful" };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const forgotPassword = async (email) => {
  // search if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return { error: "User doesnt exit", data: null };
  }

  // generate reset tokenn
  const resetToken = crypto.randomBytes(32).toString("hex");

  // hash the generated token

  const hashedToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // attaching the reset token to the user
  user.passwordResetToken = hashedToken;
  user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

  // Save the user without triggering full validation

  await user.save({ validateBeforeSave: false });

  // Return the plain token (not the hashed one)
  return { error: null, data: resetToken };
};
