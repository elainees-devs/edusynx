// src/controllers/school.controller.ts
import { Request, Response, NextFunction } from "express";
import { SchoolRepository } from "../repositories/school.repository";
import { AppError } from "../utils/AppError";

const schoolRepo = new SchoolRepository();

export const createSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newSchool = await schoolRepo.createSchool(req.body);
    res.status(201).json(newSchool);
  } catch (error) {
    next(error);
  }
};

export const getAllSchools = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const schools = await schoolRepo.findAllSchools();
    res.json(schools);
  } catch (error) {
    next(error);
  }
};

export const getSchoolById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const school = await schoolRepo.findSchoolById(req.params.id);
    if (!school) throw new AppError("School not found", 404);
    res.json(school);
  } catch (error) {
    next(error);
  }
};

export const updateSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await schoolRepo.updateSchoolById(req.params.id, req.body);
    if (!updated) throw new AppError("School not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteSchool = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await schoolRepo.deleteSchoolById(req.params.id);
    if (!deleted) throw new AppError("School not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
