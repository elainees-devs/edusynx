//src/controllers/subject.controller.ts
import { Request, Response, NextFunction } from "express";
import { SubjectRepository } from "../repositories/subject.repository";
import { AppError } from "../utils/AppError";

const subjectRepo = new SubjectRepository();

export const createSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectRepo.createSubject(req.body);
    res.status(201).json(subject);
  } catch (error) {
    next(error);
  }
};

export const getSubjectsBySchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subjects = await subjectRepo.getSubjectsBySchool(req.params.schoolId);
    res.json(subjects);
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const subject = await subjectRepo.getSubjectById(req.params.id);
    if (!subject) throw new AppError("Subject not found", 404);
    res.json(subject);
  } catch (error) {
    next(error);
  }
};

export const updateSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedSubject = await subjectRepo.updateSubject(req.params.id, req.body);
    if (!updatedSubject) throw new AppError("Subject not found", 404);
    res.json(updatedSubject);
  } catch (error) {
    next(error);
  }
};

export const deleteSubject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedSubject = await subjectRepo.deleteSubject(req.params.id);
    if (!deletedSubject) throw new AppError("Subject not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
