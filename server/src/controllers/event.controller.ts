//src/controllers/event.controller.ts
import { EventRepository } from "../repositories/event.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const eventRepository = new EventRepository();

export const createEvent = handleAsync(async (req, res) => {
  const eventData = req.body;
  const newEvent = await eventRepository.createEvent(eventData);
  res.status(201).json(newEvent);
});

export const getEventById = handleAsync<{ id: string }>(async (req, res) => {
  const event = await eventRepository.getEventById(req.params.id);
  if (!event) throw new AppError("Event not found", 404);
  res.json(event);
});

export const getAllEvents = handleAsync(async (_req, res) => {
  const events = await eventRepository.getAllEvents();
  res.json(events);
});

export const updateEvent = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
  const updatedEvent = await eventRepository.updateEventById(req.params.id, req.body);
  if (!updatedEvent) throw new AppError("Event not found", 404);
  res.json(updatedEvent);
});

export const deleteEvent = handleAsync<{ id: string }>(async (req, res) => {
  const deletedEvent = await eventRepository.deleteEventById(req.params.id);
  if (!deletedEvent) throw new AppError("Event not found", 404);
  res.status(204).send();
});

export const deleteAllEvents = handleAsync(async (_req, res) => {
  await eventRepository.deleteAllEvents();
  res.status(204).send();
});
