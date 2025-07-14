import ResponseHandler from "../utils/responseHandler";

import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  // Step 1: Check if user is attached to request
  if (!req.user) {
    return ResponseHandler.validationError(res,null,"user no authenticated");
  }

  // Step 2: Check if role is 'admin'
  if (req.user.role !== "admin") {
    return ResponseHandler.validationError(res,null,"access denied,admins only");
  }

  // Step 3: Allow to continue
  next();
};
