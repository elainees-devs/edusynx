// src/controllers/session.controller.ts
import { SessionRepository } from "../repositories/session.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";
import { handleAsync } from "../utils/handleAsync";

const sessionRepo = new SessionRepository();

export const createSession = handleAsync(async (req, res) => {
  const session = await sessionRepo.create(req.body);
  res.status(201).json(session);
});

export const getSessionById = handleAsync(async (req, res) => {
  const session = await sessionRepo.findById(req.params.id);
  if (!session) throw new AppError("Session not found", 404);
  res.json(session);
});

export const getAllSessions = handleAsync(async (req, res) => {
  const sessions = await sessionRepo.findAll(req.query);
  res.json(sessions);
});

export const updateSession = handleAsync(async (req, res) => {
  const updated = await sessionRepo.updateById(req.params.id, req.body);
  if (!updated) throw new AppError("Session not found", 404);
  res.json(updated);
});

export const deleteSession = handleAsync(async (req, res) => {
  const deleted = await sessionRepo.deleteById(req.params.id);
  if (!deleted) throw new AppError("Session not found", 404);
  res.status(204).send();
});

export const getActiveSessionsByUser = handleAsync(async (req, res) => {
  const userId = new Types.ObjectId(req.params.userId);
  const sessions = await sessionRepo.findActiveByUser(userId.toString());
  res.json(sessions);
});

export const deleteAllSessionsByUser = handleAsync(async (req, res) => {
  const userId = new Types.ObjectId(req.params.userId);
  const result = await sessionRepo.deleteAllByUser(userId.toString());
  res.json({ message: `${result.deletedCount} session(s) deleted` });
});
