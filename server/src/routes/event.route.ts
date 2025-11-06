// server/src/routes/event.route.ts
import { Router } from "express";
import { EventController } from "../controllers/event.controller";
import { validate } from "../middlewares/validate";
import { createEventSchema, updateEventSchema } from "../validation/event.schema";

const eventRouter = Router();
const eventController = new EventController();

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /api/v1/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventCreate'
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */
eventRouter.post("/", validate(createEventSchema), eventController.createEvent);

/**
 * @swagger
 * /api/v1/events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: A list of events
 */
eventRouter.get("/", eventController.getAllEvents);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   get:
 *     summary: Get a specific event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
eventRouter.get("/:id", eventController.getEventById);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventUpdate'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Event not found
 */
eventRouter.put("/:id", validate(updateEventSchema), eventController.updateEvent);

/**
 * @swagger
 * /api/v1/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event to delete
 *     responses:
 *       204:
 *         description: Event deleted successfully
 */
eventRouter.delete("/:id", eventController.deleteEvent);

/**
 * @swagger
 * /api/v1/events:
 *   delete:
 *     summary: Delete all events
 *     tags: [Events]
 *     responses:
 *       204:
 *         description: All events deleted
 */
eventRouter.delete("/", eventController.deleteAllEvents);

export { eventRouter };
