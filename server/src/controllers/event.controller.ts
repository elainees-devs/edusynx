//src/controllers/event.controller.ts
import { Request, Response, NextFunction } from "express";
import { EventRepository } from "../repositories/event.repository";
import { AppError } from "../utils/AppError";

export const createEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventData = req.body;
    const eventRepository = new EventRepository();
    const newEvent = await eventRepository.createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
}

export const getEventById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const eventRepository = new EventRepository();
    const event = await eventRepository.getEventById(eventId);
    if (!event) throw new AppError("Event not found", 404);
    res.json(event);
  } catch (error) {
    next(error);
  }
}   

export const getAllEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const eventRepository = new EventRepository();
    const events = await eventRepository.getAllEvents();
    res.json(events);
  } catch (error) {
    next(error);
  }
}       

export const updateEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const eventRepository = new EventRepository();
    const updatedEvent = await eventRepository.updateEventById(eventId, req.body);
    if (!updatedEvent) throw new AppError("Event not found", 404);
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
}   

export const deleteEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const eventId = req.params.id;
    const eventRepository = new EventRepository();
    const deletedEvent = await eventRepository.deleteEventById(eventId);
    if (!deletedEvent) throw new AppError("Event not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}   

export const deleteAllEvents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const eventRepository = new EventRepository();
    await eventRepository.deleteAllEvents();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}
