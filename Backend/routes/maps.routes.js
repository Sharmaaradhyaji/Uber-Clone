import { authUser } from "../middlewares/auth.middleware.js";
import { getCoordinates, getDistanceTimeHandler, getAutoSuggestionsHandler } from "../controllers/map.controller.js";
import { query } from "express-validator";
import { Router } from "express";

const maprouter = Router();

maprouter.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }),
    authUser,  
    getCoordinates
);

maprouter.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    authUser,  
    getDistanceTimeHandler
);

maprouter.get("/get-auto-suggestions", 
    query('input').isString().isLength({ min: 3 }), 
    authUser, 
    getAutoSuggestionsHandler);
  

export default maprouter;
