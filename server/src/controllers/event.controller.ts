// server/src/controllers/event.controller.ts
import { EventRepository } from "../repositories";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const eventRepo = new EventRepository();

export class EventController {
  createEvent = handleAsync(async (req, res) => {
    const newEvent = await eventRepo.createEvent(req.body);
    res.status(201).json(newEvent);
  });

  getEventById = handleAsync<{ id: string }>(async (req, res) => {
    const foundEvent = await eventRepo.getEventById(req.params.id);
    if (!foundEvent) throw new AppError("Event not found", 404);
    res.json(foundEvent);
  });

  getAllEvents = handleAsync(async (_req, res) => {
    const events = await eventRepo.getAllEvents();
    res.json(events);
  });

  updateEvent = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedEvent = await eventRepo.updateEventById(req.params.id, req.body);
    if (!updatedEvent) throw new AppError("Event not found", 404);
    res.json(updatedEvent);
  });

  deleteEvent = handleAsync<{ id: string }>(async (req, res) => {
    const deletedEvent = await eventRepo.deleteEventById(req.params.id);
    if (!deletedEvent) throw new AppError("Event not found", 404);
    res.status(204).send();
  });

  deleteAllEvents = handleAsync(async (_req, res) => {
    await eventRepo.deleteAllEvents();
    res.status(204).send();
  });
}
