import { captainModel } from "../models/captain.model.js";

const createCaptain = async ({
  fullname, // Pass fullname object here
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  // Now fullname is defined, and you can access its properties.
  if (!fullname) {
    throw new Error("Fullname is required");
  }

  const { firstname, lastname } = fullname;
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

  try {
    const captain = await captainModel.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType,
      },
    });
    return captain;
  } catch (error) {
    throw new Error(`Error creating captain: ${error.message}`);
  }
};

export default createCaptain;
