import { blackListTokenModel } from "../models/blackListToken.model.js";
import {captainModel} from "../models/captain.model.js";
import createCaptain from "../services/captain.service.js";
import { validationResult } from "express-validator";

export const registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password, vehicle } = req.body;

    if (!fullname || !fullname.firstname || !fullname.lastname) {
        return res.status(400).json({ message: 'First name and last name are required' });
    }

    const isCaptainAlreadyExist = await captainModel.findOne({ email });

    if (isCaptainAlreadyExist) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    
    try {
        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await createCaptain({
            fullname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        
        const token = captain.generateAuthToken();
        console.log(token);
    
        res.status(201).json({
            token,
            captain: {
                id: captain._id,
                firstname: captain.fullname.firstname,
                lastname: captain.fullname.lastname,
                email: captain.email,
                vehicle: captain.vehicle
            }
        });
    } catch (error) {
        console.error("Error while creating captain:", error);  // Log the error
        res.status(500).json({ message: "Server Error", error: error.message }); // Send detailed error message
    }
    
};

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if (!captain) {
        return res.status(400).json({ message: 'Captain not found' });
    }

    const isPasswordMatch = await captain.comparePassword(password);

    if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({
        token,
        captain: {
            id: captain._id,
            fullname: captain.fullname,
            email: captain.email,
            vehicle: captain.vehicle
        }
    });
}

export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    await blackListTokenModel.create({ token });
    res.clearCookie('token');

    res.status(200).json({ message: 'Logged out successfully' });
}