import userModel, { IUser } from "../models/user.model";

export const createUser = async (userData: IUser) => {
  try {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      return { error: "email already exists", data: null };
    }
    // create a new user
    const newUser = new userModel({ ...userData });

    // saving new user

    const savedUser = await newUser.save();

    return { error: null, data: savedUser };
  } catch (error) {
    return { error: "registration failed" };
  }
};
