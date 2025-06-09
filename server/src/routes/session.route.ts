// src/routes/session.route.ts
import { Router } from "express";
import { SessionController } from "../controllers/session.controller";
import { validate } from "../middlewares/validate";
import { createSessionSchema, updateSessionSchema } from "../validation/session.schema";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/",validate(createSessionSchema),sessionController.createSession);
sessionRouter.get("/", sessionController.getAllSessions);
sessionRouter.get("/:id", sessionController.getSessionById);
sessionRouter.put("/:id",validate(updateSessionSchema), sessionController.updateSession);
sessionRouter.delete("/:id", sessionController.deleteSession);
sessionRouter.get("/user/:userId/active", sessionController.getActiveSessionsByUser);
sessionRouter.delete("/user/:userId", sessionController.deleteAllSessionsByUser);

export {sessionRouter};
