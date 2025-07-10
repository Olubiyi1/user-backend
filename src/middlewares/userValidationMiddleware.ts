import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {  // Explicitly return void
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      res.status(400).json({
        message: "Validation failed",
        errors: error.details.map((detail) => detail.message),
      });

      // / Ensure function ends here
      return;  
    }
    // Continue to the next middleware
    next();  
  };
};

