//src/controllers/exam.controller.ts
import { Request, Response, NextFunction } from "express";
import { ExamRepository } from "../repositories/exam.repository";
import { AppError } from "../utils/AppError";

const examRepo = new ExamRepository();

export const createExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newExam = await examRepo.createExam(req.body);
    res.status(201).json(newExam);
  } catch (error) {
    next(error);
  }
};

export const getExamById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const exam = await examRepo.findExamById(req.params.id);
    if (!exam) throw new AppError("Exam not found", 404);
    res.json(exam);
  } catch (error) {
    next(error);
  }
};

export const getAllExams = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const exams = await examRepo.findAllExams();
    res.json(exams);
  } catch (error) {
    next(error);
  }
};

export const updateExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedExam = await examRepo.updateExamById(req.params.id, req.body);
    if (!updatedExam) throw new AppError("Exam not found", 404);
    res.json(updatedExam);
  } catch (error) {
    next(error);
  }
};

export const deleteExam = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedExam = await examRepo.deleteExamById(req.params.id);
    if (!deletedExam) throw new AppError("Exam not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteAllExams = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await examRepo.deleteAllExams();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
