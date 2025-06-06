// src/controllers/student.controller.ts
import { Request, Response } from "express";
import { StudentRepository } from "../repositories/student.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const studentRepo = new StudentRepository();

export const createStudent = handleAsync(async (req: Request, res: Response) => {
  const student = await studentRepo.createStudent(req.body);
  res.status(201).json(student);
});

export const generateAdmissionAndCreateStudent = handleAsync(async (req: Request, res: Response) => {
  const guardian = req.user; // Ensure guardian is attached via middleware
  const student = await studentRepo.generateAdmissionNumberAndCreateStudent(req.body, guardian);
  res.status(201).json(student);
});

export const getAllStudents = handleAsync(async (_req: Request, res: Response) => {
  const students = await studentRepo.findAllStudents();
  res.json(students);
});

export const getStudentWithGuardianById = handleAsync(async (req: Request, res: Response) => {
  const student = await studentRepo.findStudentWithGuardianById(req.params.id);
  if (!student) throw new AppError("Student not found", 404);
  res.json(student);
});

export const getStudentNameById = handleAsync(async (req: Request, res: Response) => {
  const name = await studentRepo.findStudentNameById(req.params.id);
  if (!name) throw new AppError("Student not found", 404);
  res.json({ fullName: name });
});

export const getStudentsByClassName = handleAsync(async (req: Request, res: Response) => {
  const students = await studentRepo.findStudentsByClassName(req.params.className);
  if (!students) throw new AppError("Class not found or no students", 404);
  res.json(students);
});

export const updateStudentById = handleAsync(async (req: Request, res: Response) => {
  const updatedStudent = await studentRepo.updateStudentById(req.params.id, req.body);
  if (!updatedStudent) throw new AppError("Student not found", 404);
  res.json(updatedStudent);
});

export const deleteStudentById = handleAsync(async (req: Request, res: Response) => {
  const deletedStudent = await studentRepo.deleteStudentById(req.params.id);
  if (!deletedStudent) throw new AppError("Student not found", 404);
  res.status(204).send();
});

export const deleteAllStudents = handleAsync(async (_req: Request, res: Response) => {
  await studentRepo.deleteAllStudents();
  res.status(204).send();
});

export const countStudents = handleAsync(async (req: Request, res: Response) => {
  const count = await studentRepo.countStudents(req.params.id);
  if (count === null) throw new AppError("Invalid student ID", 400);
  res.json({ count });
});

export const getAllStudentNames = handleAsync(async (_req: Request, res: Response) => {
  const names = await studentRepo.getAllStudentNames();
  res.json(names);
});
