import { Request, Response } from "express";
import ResponseHandler from "../../utils/responseHandler";

export const adminHandler = (req: Request, res: Response) => {
  return ResponseHandler.success(
    res,
    null,
    "Welcome, Admin! You have access to this route."
  );
};
