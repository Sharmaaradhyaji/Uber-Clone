import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/db.js';
import router from './routes/user.routes.js';
import cookieParser from 'cookie-parser';
import captainRoutes from './routes/captain.routes.js';
import mapRouter from './routes/maps.routes.js';
import rideRouter from './routes/ride.routes.js';

// Load environment variables first
dotenv.config();

// Connect to the database
connectDB();

// Initialize express app
const app = express();

// Use CORS middleware
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
// Set up the root route
app.get('/', (req, res) => {
    res.send("Jai Shree Ganesh");
});


app.use('/users', router)
app.use('/captains', captainRoutes)
app.use('/maps', mapRouter)
app.use('/rides', rideRouter)
// Export the app (using ES module export)
export default app;
