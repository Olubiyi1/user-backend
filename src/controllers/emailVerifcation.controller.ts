
import { Request, Response } from "express";
import userModel from "../models/user.model";
import ResponseHandler from "../utils/responseHandler";



export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.query.token as string;

  try {
    const user = await userModel.findOne({ verificationToken: token });

    if (!user) {
      return ResponseHandler.validationError(res, null, "Invalid or expired token");
    }
    
    if (!user.verificationTokenExpires || user.verificationTokenExpires < new Date()) {
      return ResponseHandler.validationError(res, null, "Verification link has expired");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return ResponseHandler.success(res, null, "Email verified successfully");
  } catch (error: any) {
    return ResponseHandler.error(res, null, "Failed to verify email");
  }
};