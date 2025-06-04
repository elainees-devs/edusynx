//src/controllers/student.controller.ts
import { Request, Response, NextFunction } from "express";
import { StudentRepository } from "../repositories/student.repository";
import { AppError } from "../utils/AppError";

const studentRepo = new StudentRepository();

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentRepo.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const generateAdmissionAndCreateStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const guardian = req.user; // Ensure guardian is attached via middleware/auth
    const student = await studentRepo.generateAdmissionNumberAndCreateStudent(req.body, guardian);
    res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await studentRepo.findAllStudents();
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const getStudentWithGuardianById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentRepo.findStudentWithGuardianById(req.params.id);
    if (!student) throw new AppError("Student not found", 404);
    res.json(student);
  } catch (error) {
    next(error);
  }
};

export const getStudentNameById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = await studentRepo.findStudentNameById(req.params.id);
    if (!name) throw new AppError("Student not found", 404);
    res.json({ fullName: name });
  } catch (error) {
    next(error);
  }
};

export const getStudentsByClassName = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const students = await studentRepo.findStudentsByClassName(req.params.className);
    if (!students) throw new AppError("Class not found or no students", 404);
    res.json(students);
  } catch (error) {
    next(error);
  }
};

export const updateStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedStudent = await studentRepo.updateStudentById(req.params.id, req.body);
    if (!updatedStudent) throw new AppError("Student not found", 404);
    res.json(updatedStudent);
  } catch (error) {
    next(error);
  }
};

export const deleteStudentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedStudent = await studentRepo.deleteStudentById(req.params.id);
    if (!deletedStudent) throw new AppError("Student not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteAllStudents = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await studentRepo.deleteAllStudents();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const countStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await studentRepo.countStudents(req.params.id);
    if (count === null) throw new AppError("Invalid student ID", 400);
    res.json({ count });
  } catch (error) {
    next(error);
  }
};

export const getAllStudentNames = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const names = await studentRepo.getAllStudentNames();
    res.json(names);
  } catch (error) {
    next(error);
  }
};
