// server/src/controllers/attendance.controller.ts
import { AttendanceRepository } from "../repositories/attendance.repository";
import { AppError, handleAsync } from "../utils";

const attendanceRepo = new AttendanceRepository();

export const createAttendance = handleAsync(async (req, res) => {
  const newAttendance = await attendanceRepo.createAttendance(req.body);
  res.status(201).json(newAttendance);
});

export const getAttendanceById = handleAsync<{ id: string }>(async (req, res) => {
  const attendance = await attendanceRepo.getAttendanceById(req.params.id);
  if (!attendance) throw new AppError("Attendance not found", 404);
  res.json(attendance);
});

export const getAllAttendances = handleAsync(async (_req, res) => {
  const attendances = await attendanceRepo.getAllAttendances();
  res.json(attendances);
});

export const updateAttendance = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
  const updated = await attendanceRepo.updateAttendanceById(req.params.id, req.body);
  if (!updated) throw new AppError("Attendance not found", 404);
  res.json(updated);
});

export const deleteAttendance = handleAsync<{ id: string }>(async (req, res) => {
  const deleted = await attendanceRepo.deleteAttendanceById(req.params.id);
  if (!deleted) throw new AppError("Attendance not found", 404);
  res.status(204).send();
});

export const deleteAllAttendances = handleAsync(async (_req, res) => {
  await attendanceRepo.deleteAllAttendances();
  res.status(204).send();
});

export const getAttendanceByClassAndDate = handleAsync(async (req, res) => {
  const { classId, date } = req.query;
  if (!classId || !date) throw new AppError("classId and date are required", 400);

  const attendance = await attendanceRepo.getAttendanceByClassAndDate(
    classId as string,
    new Date(date as string)
  );

  if (!attendance) throw new AppError("Attendance not found", 404);
  res.json(attendance);
});

export const getAttendancesBySchoolAndYear = handleAsync(async (req, res) => {
  const { schoolId, schoolYear } = req.query;
  if (!schoolId || !schoolYear) throw new AppError("schoolId and schoolYear are required", 400);

  const attendances = await attendanceRepo.getAttendancesBySchoolAndYear(
    schoolId as string,
    schoolYear as string
  );

  res.json(attendances);
});

export const getAttendanceByStudentAndDate = handleAsync(async (req, res) => {
  const { studentId, date } = req.query;
  if (!studentId || !date) throw new AppError("studentId and date are required", 400);

  const attendance = await attendanceRepo.getAttendanceByStudentAndDate(
    studentId as string,
    new Date(date as string)
  );

  if (!attendance) throw new AppError("Attendance not found", 404);
  res.json(attendance);
});
