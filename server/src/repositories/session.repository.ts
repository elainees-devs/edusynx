//src/repositories/session.repository.ts
import { SessionModel } from "../models/session.model";
import { ISession } from "../types/security/session.types";

export class SessionRepository {
  async create(data: Partial<ISession>): Promise<ISession> {
    const session = new SessionModel(data);
    return session.save();
  }

  async findById(id: string): Promise<ISession | null> {
    return SessionModel.findById(id).exec();
  }

  async findAll(filter: Partial<ISession> = {}): Promise<ISession[]> {
    return SessionModel.find(filter).exec();
  }

  async updateById(
    id: string,
    updateData: Partial<ISession>
  ): Promise<ISession | null> {
    return SessionModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteById(id: string): Promise<ISession | null> {
    return SessionModel.findByIdAndDelete(id).exec();
  }

  async findActiveByUser(userId: string): Promise<ISession[]> {
    return SessionModel.find({
      userId,
      logoutTime: { $exists: false },
    }).exec();
  }

  async deleteAllByUser(userId: string): Promise<{ deletedCount?: number }> {
    return SessionModel.deleteMany({ userId }).exec();
  }
}
