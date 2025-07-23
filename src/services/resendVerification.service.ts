import userModel, { IUser } from "../models/user.model";
import crypto from "crypto";
import { sendVerifcationEmail } from "../helpers/emailHelper";

export const resendVerification = async (userData: IUser) => {
  try {
    const existingUser = await userModel.findOne({ email: userData.email });

    // If user already exists return error
    if (!existingUser) {
      return { error: "no account found with this email" , data: null};
    }

    // if existing user aleready verified
    if (existingUser.isVerified) {
      return { error: "account already verified", data: null };
    }

    // generate new token and assign
    const newToken = crypto.randomBytes(32).toString("hex");
    existingUser.verificationToken = newToken
    existingUser.verificationTokenExpires = new Date (Date.now() + 24 *60 *60 *1000)  //expires after 24hrs

    await existingUser.save();
    await sendVerifcationEmail(existingUser.email, newToken);

    return {
      error: null,
      data: null,
      message:
        "Account already exists but not verified. A new verification link has been sent.",
    };

  } catch (error) {
    return { error: "failed to resend verifcation mail", data: null };
  }
};
