import userModel, { IUser } from "../models/user.model";
import { comparePassword, hashPassword } from "../guards/user.guards";

export const createUser = async (userData: IUser) => {
  try {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
      return { error: "email already exists", data: null };
    }

    // hash password
    const password = hashPassword(userData.password);

    // generate verifcatio token

    // create a new user
    const newUser = new userModel({ ...userData, password });

    // saving new user
    const savedUser = await newUser.save();

    return { error: null, data: savedUser };
  } catch (error) {
    return { error: "registration failed" };
  }
};

export const userLogin = async (email: string, password: string) => {
  try {
    //  find user by email first
    const user = await userModel.findOne({ email });
    if (!user) {
      return { error: "user doesn't exist", data: null };
    }
    // verify passord match
    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return { error: "invalid email or password", data: null };
    }
  } catch (error: any) {
    return { error: error.message };
  }
};
