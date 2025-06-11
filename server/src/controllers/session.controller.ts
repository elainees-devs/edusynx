// src/controllers/session.controller.ts
import { Request, Response } from "express";
import { SessionRepository } from "../repositories/session.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const sessionRepo = new SessionRepository();

export class SessionController {
  createSession = handleAsync(async (req: Request, res: Response) => {
    const newSession = await sessionRepo.createSession(req.body);
    res.status(201).json(newSession);
  });

  getSessionById = handleAsync<{ id: string }>(async (req: Request, res: Response) => {
    const session = await sessionRepo.getSessionById(req.params.id);
    if (!session) throw new AppError("Session not found", 404);
    res.json(session);
  });

  updateSession = handleAsync(async (req: Request, res: Response) => {
    const updated = await sessionRepo.updateSessionById(req.params.id, req.body);
    if (!updated) throw new AppError("Session not found", 404);
    res.json(updated);
  });

  deleteSession = handleAsync<{ id: string }>(async (req: Request, res: Response) => {
    const deleted = await sessionRepo.deleteSessionById(req.params.id);
    if (!deleted) throw new AppError("Session not found", 404);
    res.status(204).send();
  });

  getAllSessions = handleAsync(async (_req: Request, res: Response) => {
    const sessions = await sessionRepo.getAllSessions();
    res.json(sessions);
  });

  deleteAllSessions = handleAsync(async (_req: Request, res: Response) => {
    await sessionRepo.deleteAllSessions();
    res.status(204).send();
  });

  getSessionsByUserId = handleAsync(async (req: Request, res: Response) => {
    const sessions = await sessionRepo.getSessionsByUserId(req.params.userId);
    res.json(sessions);
  });

  getActiveSessions = handleAsync(async (_req: Request, res: Response) => {
    const sessions = await sessionRepo.getActiveSessions();
    res.json(sessions);
  });
}
