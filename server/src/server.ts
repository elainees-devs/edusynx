// src/server.ts
import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import logger from "./utils/logger";
import {
  userRouter,
  schoolRouter,
  classRouter,
  studentRouter,
  loginRouter,
  examRouter,
  rolePermissionRouter,
  subjectRouter,
  feeRouter,
  invoiceRouter,
  invoiceItemRouter,
  notificationRouter,
  paymentRouter,
  permissionRouter
} from "./routes";

configDotenv();

const app = express();
const PORT: number = parseInt(process.env.PORT || "5000", 10);

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
app.use('/users', userRouter);
app.use('/school', schoolRouter);
app.use('/class', classRouter);
app.use('/student', studentRouter);
app.use('/login', loginRouter);
app.use('/exam', examRouter);
app.use('/rolePermission', rolePermissionRouter);
app.use('/subject', subjectRouter);
app.use('/fee', feeRouter);
app.use('/invoice', invoiceRouter);
app.use('/invoiceItem', invoiceItemRouter);
app.use('/notification', notificationRouter);
app.use('/payment', paymentRouter);
app.use('/permission', permissionRouter);

// Health check route
app.get("/", (req: Request, res: Response) => {
  logger.info("Received request on /");
  res.send("Server is running....!");
});

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
