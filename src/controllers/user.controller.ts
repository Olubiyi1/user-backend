import {
  createUser,
  forgotPassword,
  resetPassword,
  userLogin,
} from "../services/user.service";
import ResponseHandler from "../utils/responseHandler";
import { Response, Request } from "express";

// register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { error, data } = await createUser(req.body);
    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    if (!data) {
      return ResponseHandler.validationError(res, null, "user data not found");
    }
    return ResponseHandler.success(res, data, "user successfully created");
  } catch (error: any) {
    return ResponseHandler.validationError(res, null, error.message);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // checking if email and password exists befire signing in
    if (!email || !password) {
      return ResponseHandler.validationError(
        res,
        null,
        "Email and pasword are required"
      );
    }
    // calling the login function first to prevent empty
    const result = await userLogin(email, password);

    // if empty
    if (!result) {
      return ResponseHandler.validationError(
        res,
        null,
        "Unexpected login error"
      );
    }

    // now safe to destructure
    const { error, data } = result;

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }

    return ResponseHandler.success(res, data, "login successful");
  } catch (error) {
    return ResponseHandler.validationError(res, null, "login unsuccessful");
  }
};

export const forgotUserPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // validates the input
    if (!email) {
      return ResponseHandler.validationError(
        res,
        null,
        "email must be provided"
      );
    }

    // calls the forgot user service to confirm email after destructuring

    const { error, data: resetToken } = await forgotPassword(email);
    if (error) {
      return ResponseHandler.validationError(res, null, "user not found");
    }
    // build a reset urk
    const resetUrl = `https://myfrontend.com/reset-password/${resetToken}`;

    return ResponseHandler.success(
      res,
      { resetToken, resetUrl },
      "password reset link sent"
    );
  } catch (error) {
    return ResponseHandler.error(res, null, "an internal error occured");
  }
};

export const reserUserPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return ResponseHandler.validationError(
        res,
        null,
        "new password is required"
      );
    }

    const { error, data } = await resetPassword(token, newPassword);

    if (error) {
      return ResponseHandler.validationError(res, null, error);
    }
    return ResponseHandler.success(res, data, "passwword reset successful");
  } catch (error) {}
};
