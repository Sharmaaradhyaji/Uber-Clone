import { getAddressCoordinates, getDistanceTime, getAutoSuggestions } from "../services/maps.service.js";

import { validationResult } from "express-validator";

export const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await getAddressCoordinates(address);
    res.status(200).json(coordinates);
  } catch (error) {
    res.status(500).json({ error: "Coordinates not found" });
  }
};

export const getDistanceTimeHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    res.status(500).json({ error: "Distance and time not found" });
  }
};

export const getAutoSuggestionsHandler = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { input } = req.query;
      const suggestions = await getAutoSuggestions(input); 
      res.status(200).json(suggestions);
    } catch (error) {
      console.error(error);  
      res.status(500).json({ error: `Suggestions not found: ${error.message}` });
    }
  };
  
