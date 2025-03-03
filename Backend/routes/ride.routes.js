import express from "express";
import { body } from "express-validator";
import { createRide } from "../controllers/ride.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";

const riderouter = express.Router();

riderouter.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }),
    body('destination').isString().isLength({ min: 3 }),
    body('vehicleType').isString().isIn(["car", "motorcycle", "auto"]),
    createRide
);

export default riderouter;