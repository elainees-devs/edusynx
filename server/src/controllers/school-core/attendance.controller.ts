// server/src/controllers/school-core/attendance.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { PaginationOptions } from "../../shared/pagination";
import { AttendanceRepository } from "../../repositories";
import { Types } from "mongoose";

const attendanceRepo = new AttendanceRepository();

export class AttendanceController {
  /**
   * Create attendance for a class/date
   * POST /attendance
   */
  createAttendance = handleAsync(async (req: Request, res: Response) => {
    const data = req.body;

    // Convert string IDs to ObjectId
    data.school = new Types.ObjectId(data.school);
    data.classRef = new Types.ObjectId(data.classRef);
    data.attendance = data.attendance.map((a: any) => ({
      studentId: new Types.ObjectId(a.studentId),
      status: a.status,
    }));
    data.date = new Date(data.date);

    const newAttendance = await attendanceRepo.create(data);
    res.status(201).json(newAttendance);
  });

   /**
   * Get all attendance records
   * GET /attendance/
   */
  getAllAttendance = handleAsync(async (req, res) => {
    const allAttendance = await attendanceRepo.findAll();
    res.json(allAttendance);
  });

  /**
   * Get attendance by ID
   * GET /attendance/:id
   */
  getAttendanceById = handleAsync<{ id: string }>(async (req, res) => {
    const attendance = await attendanceRepo.findById(req.params.id);
    if (!attendance) throw new AppError("Attendance not found", 404);
    res.json(attendance);
  });

  /**
 * GET /attendance?classId=xxx&streamId=xxx&date=2026-02-02
 */
getAttendanceByClassAndDate = handleAsync(async (req, res) => {
  const { classId, streamId, date } = req.query;

  if (!classId || !streamId || !date) {
    throw new AppError("classId, streamId, and date are required", 400);
  }

  const record = await attendanceRepo.findByClassStreamAndDate(
    classId as string,
    streamId as string,
    new Date(date as string)
  );

  res.json({
    success: true,
    data: record, // Returns the IAttendance object or null
  });
});
  /**
   * Update a specific student's attendance status
   * PATCH /attendance/student/:attendanceId/:studentId
   */
  updateStudentStatus = handleAsync<{ attendanceId: string; studentId: string }, any, { status: string }>(async (req, res) => {
    const { attendanceId, studentId } = req.params;
    const { status } = req.body;

    const updated = await attendanceRepo.updateStudentStatus(attendanceId, studentId, status);
    if (!updated) throw new AppError("Attendance or student not found", 404);
    res.json(updated);
  });

  /**
   * Replace full attendance array for a class/date
   * PATCH /attendance/:id
   */
  updateAttendance = handleAsync<{ id: string }, any, { attendance: any[] }>(async (req, res) => {
    const { id } = req.params;
    const attendanceArray = req.body.attendance.map((a: any) => ({
      studentId: new Types.ObjectId(a.studentId),
      status: a.status,
    }));

    const updated = await attendanceRepo.updateAttendance(id, attendanceArray);
    if (!updated) throw new AppError("Attendance not found", 404);
    res.json(updated);
  });

  /**
   * Delete attendance
   * DELETE /attendance/:id
   */
  deleteAttendance = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await attendanceRepo.delete(req.params.id);
    if (!deleted) throw new AppError("Attendance not found", 404);
    res.status(204).send();
  });
}
