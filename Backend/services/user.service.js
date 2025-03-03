import { hash } from "bcrypt";
import { userModel } from "../models/user.model.js";

export const createUser = async ({ email, firstname, lastname, password }) => {
  try {
    if (!email || email.trim() === "") {
      throw new Error("Email cannot be empty");
    }

    if (!firstname || !lastname || !password) {
      throw new Error("All fields are required");
    }

    const user = await userModel.create({
      email: email,
      fullname: {
        firstname: firstname,
        lastname: lastname,
      },
      password: password,
    });

    return user;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};