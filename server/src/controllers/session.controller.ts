// src/controllers/session.controller.ts
import { SessionRepository } from "../repositories/session.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

export class SessionController {
  private sessionRepo = new SessionRepository();

  createSession = handleAsync(async (req, res) => {
    const session = await this.sessionRepo.create(req.body);
    res.status(201).json(session);
  });

  getSessionById = handleAsync(async (req, res) => {
    const session = await this.sessionRepo.findById(req.params.id);
    if (!session) throw new AppError("Session not found", 404);
    res.json(session);
  });

  getAllSessions = handleAsync(async (req, res) => {
    const sessions = await this.sessionRepo.findAll(req.query);
    res.json(sessions);
  });

  updateSession = handleAsync(async (req, res) => {
    const updated = await this.sessionRepo.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Session not found", 404);
    res.json(updated);
  });

  deleteSession = handleAsync(async (req, res) => {
    const deleted = await this.sessionRepo.deleteById(req.params.id);
    if (!deleted) throw new AppError("Session not found", 404);
    res.status(204).send();
  });

  getActiveSessionsByUser = handleAsync(async (req, res) => {
    const userId = new Types.ObjectId(req.params.userId);
    const sessions = await this.sessionRepo.findActiveByUser(userId.toString());
    res.json(sessions);
  });

  deleteAllSessionsByUser = handleAsync(async (req, res) => {
    const userId = new Types.ObjectId(req.params.userId);
    const result = await this.sessionRepo.deleteAllByUser(userId.toString());
    res.json({ message: `${result.deletedCount} session(s) deleted` });
  });
}
