// src/repositories/attendance.repository.ts
import { CreateAttendanceDTO } from "../dto/entity.dto";
import { AttendanceModel } from "../models";
import { IAttendance } from "../types";

export class AttendanceRepository {
  async createAttendance(attendanceData: CreateAttendanceDTO): Promise<IAttendance> {
    const attendanceInstance = new AttendanceModel(attendanceData);
    return await attendanceInstance.save();
  }

  async getAttendanceById(attendanceId: string): Promise<IAttendance | null> {
    return await AttendanceModel.findById(attendanceId);
  }

  async getAllAttendances(): Promise<IAttendance[]> {
    return await AttendanceModel.find();
  }

  async updateAttendanceById(
    attendanceId: string,
    updates: Partial<CreateAttendanceDTO>
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findByIdAndUpdate(attendanceId, updates, {
      new: true,
    });
  }

  async deleteAttendanceById(attendanceId: string): Promise<IAttendance | null> {
    return await AttendanceModel.findByIdAndDelete(attendanceId);
  }

  async deleteAllAttendances(): Promise<void> {
    await AttendanceModel.deleteMany({});
  }

  async getAttendanceByClassAndDate(
    classId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findOne({ classRef: classId, date });
  }

  async getAttendancesBySchoolAndYear(
    schoolId: string,
    schoolYear: string
  ): Promise<IAttendance[]> {
    return await AttendanceModel.find({ school: schoolId, schoolYear });
  }

  async getAttendanceByStudentAndDate(
    studentId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findOne({
      "attendance.studentId": studentId,
      date,
    });
  }
}
