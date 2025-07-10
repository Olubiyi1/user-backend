import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userSchema: Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "enter an email"],
      unique: true,
      lowercase:true
    },
    password: {
      type: String,
      required: [true, "enter password"],
    },
    isVerified: {
      type : Boolean,
      default : false
    },
    verificationCode:{
      type : String,
      select: false
    },
    verificationCodeValidation:{
      type: Date,
      select: false
    }
  },
  { timestamps: true }
);

const userModel = mongoose.model<IUser>("User",userSchema)

export default userModel;