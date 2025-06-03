//src/controllers/attendance.controller.ts
import { Request, Response, NextFunction } from "express";
import { AttendanceRepository } from "../repositories/attendance.repository";
import { AppError } from "../utils/AppError";

const attendanceRepo = new AttendanceRepository();

export const createAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newAttendance = await attendanceRepo.createAttendance(req.body);
    res.status(201).json(newAttendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const attendance = await attendanceRepo.getAttendanceById(req.params.id);
    if (!attendance) throw new AppError("Attendance not found", 404);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

export const getAllAttendances = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const attendances = await attendanceRepo.getAllAttendances();
    res.json(attendances);
  } catch (error) {
    next(error);
  }
};

export const updateAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await attendanceRepo.updateAttendanceById(req.params.id, req.body);
    if (!updated) throw new AppError("Attendance not found", 404);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteAttendance = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await attendanceRepo.deleteAttendanceById(req.params.id);
    if (!deleted) throw new AppError("Attendance not found", 404);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const deleteAllAttendances = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await attendanceRepo.deleteAllAttendances();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByClassAndDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { classId, date } = req.query;
    if (!classId || !date) throw new AppError("classId and date are required", 400);

    const attendance = await attendanceRepo.getAttendanceByClassAndDate(
      classId as string,
      new Date(date as string)
    );

    if (!attendance) throw new AppError("Attendance not found", 404);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendancesBySchoolAndYear = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { schoolId, schoolYear } = req.query;
    if (!schoolId || !schoolYear) throw new AppError("schoolId and schoolYear are required", 400);

    const attendances = await attendanceRepo.getAttendancesBySchoolAndYear(
      schoolId as string,
      schoolYear as string
    );

    res.json(attendances);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByStudentAndDate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId, date } = req.query;
    if (!studentId || !date) throw new AppError("studentId and date are required", 400);

    const attendance = await attendanceRepo.getAttendanceByStudentAndDate(
      studentId as string,
      new Date(date as string)
    );

    if (!attendance) throw new AppError("Attendance not found", 404);
    res.json(attendance);
  } catch (error) {
    next(error);
  }
};
