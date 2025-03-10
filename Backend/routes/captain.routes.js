import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";
import { loginCaptain } from "../controllers/captain.controller.js";
import { authCaptain } from "../middlewares/auth.middleware.js";
import { getCaptainProfile } from "../controllers/captain.controller.js";
import { logoutCaptain } from "../controllers/captain.controller.js";

const router = express.Router();
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("fullname.firstname")
      .isString()
      .isLength({ min: 3, max: 50 })
      .withMessage("First name must be at least 3 characters long"),
    body("password")
      .isString()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters"),
    body("vehicle.color")
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("Color must be between 3 and 20 characters long"),
    body("vehicle.plate")
      .isString()
      .isLength({ min: 3, max: 20 })
      .withMessage("Plate must be between 3 and 20 characters long"),
    body("vehicle.capacity")
      .isNumeric()
      .isLength({ min: 1 })
      .withMessage("Capacity must be a number greater than or equal to 1"),
    body("vehicle.vehicleType")
      .isString()
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Vehicle type must be either car, motorcycle, or auto"),
  ],
  registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email address"),
    body("password")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 and 20 characters")
  ],
  loginCaptain
);

router.get("/profile", authCaptain, getCaptainProfile);

router.get("/logout", authCaptain, logoutCaptain);

export default router;
