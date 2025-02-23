import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Initialize express app
const app = express();

// Use dotenv to load environment variables
dotenv.config();

// Use CORS middleware
app.use(cors());

// Set up the root route
app.get('/', (req, res) => {
    res.send("Jai Shree Ganesh");
});

// Export the app (using ES module export)
export default app;
