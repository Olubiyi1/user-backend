// import { string } from "joi";
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  verificationToken?: string;
  verificationCodeValidation: Date;
  verificationTokenExpires?: Date;
  role : "user" | "admin",
  passwordResetToken?: string;
  passwordResetExpires?: Date;
}
// user schema
const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "enter an email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "enter password"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationCodeValidation: {
      type: Date,
      select: false,
    },
    verificationTokenExpires:{
      type:Date
    },
    role:{
      type: String,
      enum:["user", "admin"],
      default: "user"
    },
     passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  }
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUser>("User", userSchema);

export default userModel;
