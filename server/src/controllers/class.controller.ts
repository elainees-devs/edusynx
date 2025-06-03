//src/controllers/class.controller.ts
import { Request, Response, NextFunction } from "express";
import { ClassRepository } from "../repositories/class.repository";
import { AppError } from "../utils/AppError";

const classRepo = new ClassRepository();

export const createClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newClass = await classRepo.createClass(req.body);
    res.status(201).json(newClass);
  } catch (error) {
    next(error);
  }
};

export const getClassById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const foundClass = await classRepo.getClassById(req.params.id);
    if (!foundClass) throw new AppError("Class not found", 404);
    res.json(foundClass);
  } catch (error) {
    next(error);
  }
};

export const getAllClasses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const classes = await classRepo.getAllClasses();
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedClass = await classRepo.updateClassById(req.params.id, req.body);
    if (!updatedClass) throw new AppError("Class not found", 404);
    res.json(updatedClass);
  } catch (error) {
    next(error);
  }
};

export const deleteClass = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedClass = await classRepo.deleteClassById(req.params.id);
    if (!deletedClass) throw new AppError("Class not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteAllClasses = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await classRepo.deleteAllClasses();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getClassesBySchoolId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schoolId } = req.params;
    if (!schoolId) throw new AppError("schoolId parameter is required", 400);

    const classes = await classRepo.getClassesBySchoolId(schoolId);
    res.json(classes);
  } catch (error) {
    next(error);
  }
};

export const getClassesByAcademicYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { academicYear } = req.query;
    if (!academicYear) throw new AppError("academicYear query parameter is required", 400);

    const classes = await classRepo.getClassesByAcademicYear(academicYear as string);
    res.json(classes);
  } catch (error) {
    next(error);
  }
};
