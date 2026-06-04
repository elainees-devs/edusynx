// server/src/controllers/school-core/attendance.controller.ts

import { Request, Response } from "express";
import { Types } from "mongoose";

import { AttendanceRepository } from "../../repositories";
import { AppError } from "../../utils/AppError";
import { handleAsync } from "../../utils/handleAsync";
import { IAttendance } from "../../types";

const attendanceRepo = new AttendanceRepository();

interface AttendanceEntryRequest {
  studentId: string;
  status: string;
}

interface AttendanceEntryPayload {
  studentId: Types.ObjectId;
  status: string;
}

interface CreateAttendanceRequest {
  school: string;
  classRef: string;
  streamId: string;
  schoolYear: string;
  date: string;
  createdBy: string;
  remarks?: string;
  attendance: AttendanceEntryRequest[];
}

interface UpdateAttendanceRequest {
  attendance: AttendanceEntryRequest[];
  updatedBy: string;
  remarks?: string;
}

interface UpdateStudentStatusRequest {
  status: string;
}

export class AttendanceController {
  /**
   * Create attendance for a class/date
   * POST /attendance
   */
  createAttendance = handleAsync<
    Record<string, never>,
    unknown,
    CreateAttendanceRequest
  >(async (req: Request, res: Response) => {
    const data = req.body;

    const attendanceEntries: AttendanceEntryPayload[] =
      data.attendance.map((entry: AttendanceEntryRequest) => ({
        studentId: new Types.ObjectId(entry.studentId),
        status: entry.status,
      }));

    const attendanceData = {
      ...data,
      school: new Types.ObjectId(data.school),
      classRef: new Types.ObjectId(data.classRef),
      streamId: new Types.ObjectId(data.streamId),
      createdBy: new Types.ObjectId(data.createdBy),
      date: new Date(data.date),
      attendance: attendanceEntries,
    };

    const newAttendance = await attendanceRepo.create(
      attendanceData as unknown as IAttendance
    );

    res.status(201).json({
      success: true,
      data: newAttendance,
    });
  });

  /**
   * Get all attendance records
   * GET /attendance
   */
  getAllAttendance = handleAsync(async (_req, res) => {
    const allAttendance = await attendanceRepo.findAll();

    res.json({
      success: true,
      data: allAttendance,
    });
  });

  /**
   * Get attendance by ID
   * GET /attendance/:id
   */
  getAttendanceById = handleAsync<{ id: string }>(async (req, res) => {
    const attendance = await attendanceRepo.findById(req.params.id);

    if (!attendance) {
      throw new AppError("Attendance not found", 404);
    }

    res.json({
      success: true,
      data: attendance,
    });
  });

  /**
   * GET /attendance?classId=xxx&streamId=xxx&date=2026-02-02
   */
  getAttendanceByClassAndDate = handleAsync(async (req, res) => {
    const { classId, streamId, date } = req.query;

    if (!classId || !streamId || !date) {
      throw new AppError(
        "classId, streamId, and date are required",
        400
      );
    }

    const record = await attendanceRepo.findByClassStreamAndDate(
      classId as string,
      streamId as string,
      new Date(date as string)
    );

    res.json({
      success: true,
      data: record,
    });
  });

  /**
   * Update a specific student's attendance status
   * PATCH /attendance/student/:attendanceId/:studentId
   */
  updateStudentStatus = handleAsync<
    { attendanceId: string; studentId: string },
    unknown,
    UpdateStudentStatusRequest
  >(async (req, res) => {
    const { attendanceId, studentId } = req.params;
    const { status } = req.body;

    const updated = await attendanceRepo.updateStudentStatus(
      attendanceId,
      studentId,
      status
    );

    if (!updated) {
      throw new AppError("Attendance or student not found", 404);
    }

    res.json({
      success: true,
      data: updated,
    });
  });

  /**
   * Replace full attendance array for a class/date
   * PATCH /attendance/:id
   */
  updateAttendance = handleAsync<
    { id: string },
    unknown,
    UpdateAttendanceRequest
  >(async (req, res) => {
    const { id } = req.params;
    const { attendance, updatedBy, remarks } = req.body;

    const attendanceArray: AttendanceEntryPayload[] =
      attendance.map((entry: AttendanceEntryRequest) => ({
        studentId: new Types.ObjectId(entry.studentId),
        status: entry.status,
      }));

    const updated = await attendanceRepo.updateAttendance(
      id,
      attendanceArray,
      new Types.ObjectId(updatedBy),
      remarks
    );

    if (!updated) {
      throw new AppError("Attendance not found", 404);
    }

    res.json({
      success: true,
      data: updated,
    });
  });

  /**
   * Delete attendance
   * DELETE /attendance/:id
   */
  deleteAttendance = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await attendanceRepo.delete(req.params.id);

    if (!deleted) {
      throw new AppError("Attendance not found", 404);
    }

    res.status(204).send();
  });
}