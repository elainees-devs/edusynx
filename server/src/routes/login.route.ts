// src/routes/login.route.ts
import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { loginSchema } from "../validation/login.schema";
import { validate } from "../middlewares/validate";
import { sanitizeHeaders } from "../middlewares/sanitizeHeaders";

const loginRouter = Router();
const loginsController = new LoginController();

loginRouter.post(
  "/",
  sanitizeHeaders,
  validate(loginSchema),
  loginsController.login
);

export { loginRouter };
