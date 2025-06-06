// src/controllers/subject.controller.ts
import { Request, Response } from "express";
import { SubjectRepository } from "../repositories/subject.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const subjectRepo = new SubjectRepository();

export const createSubject = handleAsync(async (req: Request, res: Response) => {
  const subject = await subjectRepo.createSubject(req.body);
  res.status(201).json(subject);
});

export const getSubjectsBySchool = handleAsync(async (req: Request, res: Response) => {
  const subjects = await subjectRepo.getSubjectsBySchool(req.params.schoolId);
  res.json(subjects);
});

export const getSubjectById = handleAsync(async (req: Request, res: Response) => {
  const subject = await subjectRepo.getSubjectById(req.params.id);
  if (!subject) throw new AppError("Subject not found", 404);
  res.json(subject);
});

export const updateSubject = handleAsync(async (req: Request, res: Response) => {
  const updatedSubject = await subjectRepo.updateSubject(req.params.id, req.body);
  if (!updatedSubject) throw new AppError("Subject not found", 404);
  res.json(updatedSubject);
});

export const deleteSubject = handleAsync(async (req: Request, res: Response) => {
  const deletedSubject = await subjectRepo.deleteSubject(req.params.id);
  if (!deletedSubject) throw new AppError("Subject not found", 404);
  res.status(204).send();
});
