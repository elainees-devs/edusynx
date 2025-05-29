// src/server.ts
import express, { Request, Response } from 'express';
import { configDotenv } from 'dotenv';
import connectDB from './config/db';


configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB()

// Middleware
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running....!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
