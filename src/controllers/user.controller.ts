import { createUser, userLogin } from "../services/user.service";
import ResponseHandler from "../utils/responseHandler";
import { Response, Request } from "express";

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
