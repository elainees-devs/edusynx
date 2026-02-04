// server/src/repositories/school-core/attendance.repository.ts
import { Types } from "mongoose";
import { IAttendance } from "../../types";
import { AttendanceModel } from "../../models";
import { PaginationOptions } from "../../shared/pagination";

export class AttendanceRepository {
  /**
   * Create a new attendance record for a class on a specific date
   */
  async create(attendanceData: IAttendance): Promise<IAttendance> {
    const attendance = new AttendanceModel(attendanceData);
    return attendance.save();
  }

  /**
   * Find attendance by ID
   */
  async findById(id: string): Promise<IAttendance | null> {
    return AttendanceModel.findById(id)
      .populate("school")
      .populate("classRef")
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Get attendance for a class on a specific date
   */
  async findByClassAndDate(
    classId: string,
    date: Date
  ): Promise<IAttendance | null> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.findOne({
      classRef: classId,
      date: { $gte: start, $lte: end },
    })
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Get attendance for a class on a specific date with pagination
   */
  async findByClassAndDatePaginated(
    classId: string,
    date: Date,
    options: PaginationOptions
  ): Promise<IAttendance[]> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.find({
      classRef: classId,
      date: { $gte: start, $lte: end },
    })
      .skip(options.skip || 0)
      .limit(options.limit || 10)
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Count attendance records for a class on a specific date
   */
  async countByClassAndDate(classId: string, date: Date): Promise<number> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.countDocuments({
      classRef: classId,
      date: { $gte: start, $lte: end },
    }).exec();
  }

  /**
   * Get all attendance for a school/year
   */
  async findAllBySchoolYear(
    schoolId: string,
    schoolYear: string
  ): Promise<IAttendance[]> {
    return AttendanceModel.find({
      school: schoolId,
      schoolYear,
    })
      .populate("classRef")
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Update a specific student's attendance status
   */
  async updateStudentStatus(
    attendanceId: string,
    studentId: string,
    status: string
  ): Promise<IAttendance | null> {
    return AttendanceModel.findOneAndUpdate(
      {
        _id: attendanceId,
        "attendance.studentId": studentId,
      },
      { $set: { "attendance.$.status": status } },
      { new: true }
    )
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Replace the full attendance array for a class/date
   */
  async updateAttendance(
    attendanceId: string,
    attendanceArray: { studentId: Types.ObjectId; status: string }[]
  ): Promise<IAttendance | null> {
    return AttendanceModel.findByIdAndUpdate(
      attendanceId,
      { attendance: attendanceArray },
      { new: true }
    )
      .populate("attendance.studentId")
      .exec();
  }

  /**
   * Delete attendance by ID
   */
  async delete(attendanceId: string): Promise<IAttendance | null> {
    return AttendanceModel.findByIdAndDelete(attendanceId).exec();
  }
}
