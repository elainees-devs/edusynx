// server/src/server.ts
import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import logger from "./utils/logger";
import { setupSwagger } from "./docs/swagger";
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
  emailRouter,
  resetRouter,
  allocationRouter,
  streamRouter,
  departmentRouter,
  guardianRouter,
  classTeacherRoute,
  feePaymentRouter,
  profileRouter,
} from "./routes";
import { SchoolController } from "./controllers";
import adminRouter from "./routes/super-admin.route";

configDotenv();

const app = express();
const apiRouter = express.Router();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:5173";


// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [FRONTEND_BASE_URL], // allow your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // if you need cookies/auth
  })
);

app.use(helmet());

const schoolController = new SchoolController();

// Database connection
connectDB();

// Mount Swagger before your API routes
setupSwagger(app);

// Health check route
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
apiRouter.use("/role-permissions", rolePermissionRouter);
apiRouter.use("/subjects", subjectRouter);
apiRouter.use("/fees", feeRouter);
apiRouter.use("/invoices", invoiceRouter);
apiRouter.use("/invoice-items", invoiceItemRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/payments", paymentRouter);
apiRouter.use("/fee-payments",  feePaymentRouter);
apiRouter.use("/permissions", permissionRouter);
apiRouter.use("/sessions", sessionRouter);
apiRouter.use("/events", eventRouter);
apiRouter.use("/emails", emailRouter);
apiRouter.use("/super-admin", adminRouter);
apiRouter.use("/password-reset", resetRouter);
apiRouter.use("/allocations", allocationRouter);
apiRouter.use("/streams", streamRouter);
apiRouter.use("/profile", profileRouter);


app.use("/api/v1", apiRouter);

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
