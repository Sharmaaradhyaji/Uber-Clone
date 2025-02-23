import { validationResult } from "express-validator";
import createUser from "../services/user.service.js"; // Service for user creation
import { userModel } from "../models/user.model.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { blackListTokenModel } from "../models/blackListToken.model.js";

// Register user
const registerUser = async (req, res, next) => {
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

// Login user
const loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user profile
const getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

const logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1]

    await blackListTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}

export {
  registerUser,
  loginUser,
  getUserProfile,
    logoutUser
};
