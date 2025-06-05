//src/repositories/event.repository.ts
import { EventModel } from "../models/event.model";
import { IEvent } from "../types";
import { AppError } from "../utils/AppError";


export class EventRepository {
  async createEvent(eventData: IEvent): Promise<IEvent> {
    const event = new EventModel(eventData);
    return await event.save();
  }

  async getEventById(id: string): Promise<IEvent | null> {
    return await EventModel.findById(id);
  }

  async getAllEvents(): Promise<IEvent[]> {
    return await EventModel.find();
  }

  async updateEventById(id: string, eventData: Partial<IEvent>): Promise<IEvent | null> {
    const updatedEvent = await EventModel.findByIdAndUpdate(id, eventData, { new: true });
    if (!updatedEvent) throw new AppError("Event not found", 404);
    return updatedEvent;
  }

  async deleteEventById(id: string): Promise<IEvent | null> {
    const deletedEvent = await EventModel.findByIdAndDelete(id);
    if (!deletedEvent) throw new AppError("Event not found", 404);
    return deletedEvent;
  }

  async deleteAllEvents(): Promise<void> {
    await EventModel.deleteMany({});
  }
}       