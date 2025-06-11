// src/routes/session.route.ts
import { Router } from "express";
import { SessionController } from "../controllers";
import { createSessionSchema, updateSessionSchema } from "../validation/session.schema";
import { validate } from "../middlewares/validate";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/", validate(createSessionSchema), sessionController.createSession);
sessionRouter.get("/", sessionController.getAllSessions);
sessionRouter.get("/active", sessionController.getActiveSessions);
sessionRouter.get("/user/:userId", sessionController.getSessionsByUserId);
sessionRouter.get("/:id", sessionController.getSessionById);
sessionRouter.put("/:id", validate(updateSessionSchema), sessionController.updateSession);
sessionRouter.delete("/:id", sessionController.deleteSession);
sessionRouter.delete("/", sessionController.deleteAllSessions);

export { sessionRouter };
