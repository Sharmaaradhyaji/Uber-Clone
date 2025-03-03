import {createNewRide} from "../services/ride.service.js";
import { validationResult } from "express-validator";
export const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const user = req.user._id;

    try {
        const ride = await createNewRide(user, pickup, destination, vehicleType);
        res.status(201).json(ride);
    } catch (error) {
        console.error("Error in createRide controller:", error.message); // Debug log
        res.status(500).json({ error: "Ride not created", message: error.message });
    }
};
