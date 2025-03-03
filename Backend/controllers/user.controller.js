import { validationResult } from "express-validator";
import {createUser} from "../services/user.service.js"; 
import { userModel } from "../models/user.model.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { blackListTokenModel } from "../models/blackListToken.model.js";

const registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, fullname, password } = req.body;

  if(!email || email.trim() === ""){
    return res.status(400).json({ message: "Email is required "})
  }

  const isUserAlreadyExist = await userModel.findOne({
    email,
  });

  if(isUserAlreadyExist) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      email,
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({
      token,
      user
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
