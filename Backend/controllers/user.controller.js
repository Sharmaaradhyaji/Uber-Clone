import { validationResult } from "express-validator";
import createUser from "../services/user.service.js"; // Service for user creation
import { userModel } from "../models/user.model.js";

const registerUser = async (req, res, next) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  try {
    const hashedPassword = await userModel.hashPassword(password);

    // Create the user by passing the hashed password
    const user = await createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    // Respond with the token and user data (excluding the password)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        firstname: user.fullname.firstname,
        lastname: user.fullname.lastname,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default registerUser;
