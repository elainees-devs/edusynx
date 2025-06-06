// src/server.ts
import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db";
import logger from "./utils/logger";
import router from "./routes/user.route";

configDotenv();

const app = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Database connection
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/users", router);
app.get("/", (req: Request, res: Response) => {
  logger.info("Received request on /");
  res.send("Server is running....!");
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
