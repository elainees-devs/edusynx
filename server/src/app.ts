// server/src/app.ts
/// <reference types="./types/express" />

import dotenv from "dotenv";
import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import { setupSwagger } from "./docs/swagger";
import {
  userRouter,
  schoolRouter,
  classRouter,
  studentRouter,
  loginRouter,
  examRouter,
  examResultRouter,
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
  emailRouter,
  resetRouter,
  allocationRouter,
  streamRouter,
  departmentRouter,
  guardianRouter,
  classTeacherRoute,
  feePaymentRouter,
  profileRouter,
  analyticsRouter,
  teacherSubjectRouter,
  subscriptionPlanRouter,
  subscriptionRouter,
  attendanceRouter,
  cbcRouter,
  academicYearRouter,
  enrollmentRouter,
  staffRouter,
  superAdminRouter,
} from "./routes";
import { SchoolController } from "./controllers";

// Load env
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const app = express();
const apiRouter = express.Router();

const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// Controllers
const schoolController = new SchoolController();

// Database connection
connectDB();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      FRONTEND_BASE_URL,
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(helmet());

// Swagger
setupSwagger(app);

// Health check
apiRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "API v1 is up and running" });
});

// Routes
apiRouter.use("/schools", schoolRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/guardians", guardianRouter);
apiRouter.use("/students", studentRouter);

app.get("/:slug/signup", schoolController.getSchoolBySlug);

apiRouter.use("/classes", classRouter);
apiRouter.use("/class-overview", classTeacherRoute);
apiRouter.use("/departments", departmentRouter);
apiRouter.use("/auth", loginRouter);
apiRouter.use("/exams", examRouter);
apiRouter.use("/exam-results", examResultRouter);
apiRouter.use("/role-permissions", rolePermissionRouter);
apiRouter.use("/subjects", subjectRouter);
apiRouter.use("/teacher-subjects", teacherSubjectRouter);
apiRouter.use("/fees", feeRouter);
apiRouter.use("/invoices", invoiceRouter);
apiRouter.use("/invoice-items", invoiceItemRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/fee-payments", feePaymentRouter);
apiRouter.use("/permissions", permissionRouter);
apiRouter.use("/sessions", sessionRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/emails", emailRouter);
apiRouter.use("/super-admin", superAdminRouter);
apiRouter.use("/password-reset", resetRouter);
apiRouter.use("/allocations", allocationRouter);
apiRouter.use("/streams", streamRouter);
apiRouter.use("/academic-years", academicYearRouter);
apiRouter.use("/profile", profileRouter);
apiRouter.use("/analytics", analyticsRouter);
apiRouter.use("/subscription-plans", subscriptionPlanRouter);
apiRouter.use("/subscriptions", subscriptionRouter);
apiRouter.use("/attendance", attendanceRouter);
apiRouter.use("/teacher-subject-allocations", teacherSubjectRouter);
apiRouter.use("/cbc", cbcRouter);
apiRouter.use("/enrollments", enrollmentRouter);
apiRouter.use("/staff", staffRouter);

// Mount API base
app.use("/api/v1", apiRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;