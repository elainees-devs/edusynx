// src/routes/event.route.ts
import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { validate } from "../middlewares/validate";
import { createEventSchema, updateEventSchema } from "../validation/event.schema";

const eventRouter = Router();
const eventController = new EventController();

eventRouter.post("/",validate(createEventSchema),eventController.createEvent);
eventRouter.get("/", eventController.getAllEvents);
eventRouter.get("/:id", eventController.getEventById);
eventRouter.put("/:id",validate(updateEventSchema),eventController.updateEvent);
eventRouter.delete("/:id", eventController.deleteEvent);
eventRouter.delete("/", eventController.deleteAllEvents);

export default eventRouter;
