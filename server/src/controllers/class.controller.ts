//src/controllers/class.controller
import { Request, Response } from "express";
import { ClassRepository } from "../repositories/class.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const classRepo = new ClassRepository();

export const createClass = handleAsync(async (req, res) => {
  const newClass = await classRepo.createClass(req.body);
  res.status(201).json(newClass);
});

export const getClassById = handleAsync<{ id: string }>(async (req, res) => {
  const foundClass = await classRepo.getClassById(req.params.id);
  if (!foundClass) throw new AppError("Class not found", 404);
  res.json(foundClass);
});

export const getAllClasses = handleAsync(async (_req, res) => {
  const classes = await classRepo.getAllClasses();
  res.json(classes);
});

export const updateClass = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
  const updatedClass = await classRepo.updateClassById(req.params.id, req.body);
  if (!updatedClass) throw new AppError("Class not found", 404);
  res.json(updatedClass);
});

export const deleteClass = handleAsync<{ id: string }>(async (req, res) => {
  const deletedClass = await classRepo.deleteClassById(req.params.id);
  if (!deletedClass) throw new AppError("Class not found", 404);
  res.status(204).send();
});

export const deleteAllClasses = handleAsync(async (_req, res) => {
  await classRepo.deleteAllClasses();
  res.status(204).send();
});

export const getClassesBySchoolId = handleAsync<{ schoolId: string }>(async (req, res) => {
  const { schoolId } = req.params;
  if (!schoolId) throw new AppError("schoolId parameter is required", 400);

  const classes = await classRepo.getClassesBySchoolId(schoolId);
  res.json(classes);
});

export const getClassesByAcademicYear = handleAsync(async (req, res) => {
  const { academicYear } = req.query;
  if (!academicYear) throw new AppError("academicYear query parameter is required", 400);

  const classes = await classRepo.getClassesByAcademicYear(academicYear as string);
  res.json(classes);
});
