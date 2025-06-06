//src/controllers/exam.controller.ts
import { Request, Response } from "express";
import { ExamRepository } from "../repositories/exam.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const examRepo = new ExamRepository();

export const createExam = handleAsync(async (req, res) => {
  const newExam = await examRepo.createExam(req.body);
  res.status(201).json(newExam);
});

export const getExamById = handleAsync<{ id: string }>(async (req, res) => {
  const exam = await examRepo.findExamById(req.params.id);
  if (!exam) throw new AppError("Exam not found", 404);
  res.json(exam);
});

export const getAllExams = handleAsync(async (_req, res) => {
  const exams = await examRepo.findAllExams();
  res.json(exams);
});

export const updateExam = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
  const updatedExam = await examRepo.updateExamById(req.params.id, req.body);
  if (!updatedExam) throw new AppError("Exam not found", 404);
  res.json(updatedExam);
});

export const deleteExam = handleAsync<{ id: string }>(async (req, res) => {
  const deletedExam = await examRepo.deleteExamById(req.params.id);
  if (!deletedExam) throw new AppError("Exam not found", 404);
  res.status(204).send();
});

export const deleteAllExams = handleAsync(async (_req, res) => {
  await examRepo.deleteAllExams();
  res.status(204).send();
});
