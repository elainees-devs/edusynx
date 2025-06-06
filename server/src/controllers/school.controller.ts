// src/controllers/school.controller.ts
import { Request, Response } from "express";
import { SchoolRepository } from "../repositories/school.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const schoolRepo = new SchoolRepository();

export const createSchool = handleAsync(async (req: Request, res: Response) => {
  const newSchool = await schoolRepo.createSchool(req.body);
  res.status(201).json(newSchool);
});

export const getAllSchools = handleAsync(async (_req: Request, res: Response) => {
  const schools = await schoolRepo.findAllSchools();
  res.json(schools);
});

export const getSchoolById = handleAsync(async (req: Request, res: Response) => {
  const school = await schoolRepo.findSchoolById(req.params.id);
  if (!school) throw new AppError("School not found", 404);
  res.json(school);
});

export const updateSchool = handleAsync(async (req: Request, res: Response) => {
  const updated = await schoolRepo.updateSchoolById(req.params.id, req.body);
  if (!updated) throw new AppError("School not found", 404);
  res.json(updated);
});

export const deleteSchool = handleAsync(async (req: Request, res: Response) => {
  const deleted = await schoolRepo.deleteSchoolById(req.params.id);
  if (!deleted) throw new AppError("School not found", 404);
  res.status(204).send();
});
