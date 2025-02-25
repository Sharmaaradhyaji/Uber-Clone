import {captainModel} from '../models/captain.model.js';

const createCaptain = async ({
    fullname,
    email,
    password,
    color,
    plate,
    capacity,
    vehicleType
  }) => {
    if (!fullname) {
      throw new Error("Fullname is required");
    }
    if (!email) {
      throw new Error("Email is required");
    }
    if (!password) {
      throw new Error("Password is required");
    }
    if (!color) {
      throw new Error("Color is required");
    }
    if (!plate) {
      throw new Error("Plate is required");
    }
    if (!capacity) {
      throw new Error("Capacity is required");
    }
    if (!vehicleType) {
      throw new Error("Vehicle type is required");
    }
  
    const captain = await captainModel.create({
      fullname,
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      }
    });
  
    return captain;
  };
  


export default createCaptain;