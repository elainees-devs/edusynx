// src/repositories/session.repository.ts
import { CreateSessionDTO } from "../dto/entity.dto";
import { SessionModel } from "../models";
import { ISession } from "../types/security/session.types";

export class SessionRepository {
  async createSession(sessionData: CreateSessionDTO): Promise<ISession> {
    const session = new SessionModel(sessionData);
    return await session.save();
  }

  async getSessionById(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findById(sessionId);
  }

  async getAllSessions(): Promise<ISession[]> {
    return await SessionModel.find();
  }

  async updateSessionById(
    sessionId: string,
    sessionData: Partial<CreateSessionDTO>
  ): Promise<ISession | null> {
    return await SessionModel.findByIdAndUpdate(sessionId, sessionData, {
      new: true,
    });
  }

  async deleteSessionById(sessionId: string): Promise<ISession | null> {
    return await SessionModel.findByIdAndDelete(sessionId);
  }

  async deleteAllSessions(): Promise<void> {
    await SessionModel.deleteMany({});
  }

  async getSessionsByUserId(userId: string): Promise<ISession[]> {
    return await SessionModel.find({ userId });
  }

  async getActiveSessions(): Promise<ISession[]> {
    const now = new Date();
    return await SessionModel.find({
      expiryTime: { $gt: now.getTime() / 1000 },
    });
  }
}
