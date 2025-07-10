import Joi from "joi";

// creating an interface

interface UserRegistration{
    email: string,
    password: string
}

// validation schema

export const registerUserValidationSchema:Joi.ObjectSchema<UserRegistration>=Joi.object({
email:Joi.string()
.email()
.trim()
.required()
.messages({
    "string.required":"Please enter an email",
    "any.required":"email is required",
    "string.email":"email must be in email format"
}),

password:Joi.string()
.trim()
.required()
.max(8)
.pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$'))
.messages({
    "any.required":"password is required",
    "string.min":"password cannot be less than 7 characters",
    "string.patten":"password must contain lowercase,uppercase,digit,special characters"
})
})
