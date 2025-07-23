import Joi from "joi";

// creating an interface(template)
interface UserRegistration {
  email: string;
  password: string;
  role: string;
}

// validation schema

export const registerUserValidationSchema: Joi.ObjectSchema<UserRegistration> =
  Joi.object({
    email: Joi.string().email().trim().required().lowercase().messages({
      "string.required": "Please enter an email",
      "any.required": "email is required",
      "string.email": "email must be in email format",
    }),

    password: Joi.string()
      .trim()
      .required()
      .min(8)
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
        )
      )
      .messages({
        "any.required": "password is required",
        "string.min": "password cannot be less than 8 characters",
        "string.pattern.base":
          "password must contain lowercase,uppercase,digit,special characters",
      }),
    role: Joi.string()
      .valid("user", "admin") // only allow "user" or "admin"
      .optional()
      .messages({
        "any.only": "Role must be either 'user' or 'admin'",
      }),
  });

export const loginValidationSchema: Joi.ObjectSchema<UserRegistration> =
  Joi.object({
    email: Joi.string().email().required().trim().lowercase(),

    password: Joi.string().trim().required(),
  });

export const resetPasswordSchema: Joi.ObjectSchema<UserRegistration> =
  Joi.object({
    password: Joi.string().trim().required(),
  });

