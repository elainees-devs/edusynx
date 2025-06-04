//src/controllers/session.controller.ts
import { Request, Response, NextFunction } from "express";
import { SessionRepository } from "../repositories/session.repository";
import { AppError } from "../utils/AppError";
import { Types } from "mongoose";

export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await SessionRepository.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    next(error);
  }
};

export const getSessionById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await SessionRepository.findById(req.params.id);
    if (!session) throw new AppError("Session not found", 404);
    res.json(session);
  } catch (error) {
    next(error);
  }
};

export const getAllSessions = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sessions = await SessionRepository.findAll(req.query);
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await SessionRepository.updateById(req.params.id, req.body);
    if (!updated) throw new AppError("Session not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await SessionRepository.deleteById(req.params.id);
    if (!deleted) throw new AppError("Session not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getActiveSessionsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const sessions = await SessionRepository.findActiveByUser(userId.toString());
    res.json(sessions);
  } catch (error) {
    next(error);
  }
};

export const deleteAllSessionsByUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = new Types.ObjectId(req.params.userId);
    const result = await SessionRepository.deleteAllByUser(userId.toString());
    res.json({ message: `${result.deletedCount} session(s) deleted` });
  } catch (error) {
    next(error);
  }
};
