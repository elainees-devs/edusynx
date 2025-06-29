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
  permissionRouter,
  sessionRouter,
  eventRouter,
} from "./routes";
import { SchoolController } from "./controllers";
import emailRouter from "./routes/email.route";



configDotenv();

const app = express();
const apiRouter = express.Router();
const schoolController = new SchoolController();

const PORT: number = parseInt(process.env.PORT || "5000", 10);
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// Database connection
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Routes
apiRouter.use("/users", userRouter);
apiRouter.use("/school", schoolRouter);
app.get("/:slug/signup", schoolController.getSchoolBySlug);
apiRouter.use("/class", classRouter);
apiRouter.use("/student", studentRouter);
apiRouter.use("/auth", loginRouter);
apiRouter.use("/exam", examRouter);
apiRouter.use("/rolePermission", rolePermissionRouter);
apiRouter.use("/subject", subjectRouter);
apiRouter.use("/fee", feeRouter);
apiRouter.use("/invoice", invoiceRouter);
apiRouter.use("/invoiceItem", invoiceItemRouter);
apiRouter.use("/notification", notificationRouter);
apiRouter.use("/payment", paymentRouter);
apiRouter.use("/permission", permissionRouter);
apiRouter.use("/session", sessionRouter);
apiRouter.use("/event", eventRouter);
apiRouter.use("/email", emailRouter)


app.use("/api/v1", apiRouter);
// Health check route
apiRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "API v1 is up and running" });
});

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
