// server/src/server.ts
import express, { Request, Response } from "express";
import { configDotenv } from "dotenv";
import cors from "cors";
import helmet from "helmet";
import connectDB from "./config/db";
import logger from "./utils/logger";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { options } from "./docs/swagger";
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
  guardianRouter
} from "./routes";
import { SchoolController } from "./controllers";
import adminRouter from "./routes/super-admin.route";

configDotenv();

const app = express();
const apiRouter = express.Router();
const PORT: number = parseInt(process.env.PORT || "5000", 10);
const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:5173";
// Swagger setup
const swaggerSpec = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      url: "/api-docs/swagger.json",
    },
  })
);

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

const schoolController = new SchoolController();

// Database connection
connectDB();

// Health check route
apiRouter.get("/", (req: Request, res: Response) => {
  res.json({ message: "API v1 is up and running" });
});

// Routes

apiRouter.use("/school", schoolRouter);
apiRouter.use("/users", userRouter);
apiRouter.use("/guardians", guardianRouter);
apiRouter.use("/student", studentRouter);
app.get("/:slug/signup", schoolController.getSchoolBySlug);
apiRouter.use("/class", classRouter);
apiRouter.use("/department", departmentRouter);
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
apiRouter.use("/email", emailRouter);
apiRouter.use("/super-admin", adminRouter);
apiRouter.use("/password-reset", resetRouter);
apiRouter.use("/allocations", allocationRouter);
apiRouter.use("/stream", streamRouter);

app.use("/api/v1", apiRouter);

// 404 fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
