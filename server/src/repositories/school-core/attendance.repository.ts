// server/src/repositories/school-core/attendance.repository.ts

import { Types } from "mongoose";
import { IAttendance } from "../../types";
import { AttendanceModel } from "../../models";

interface AttendanceListItem {
  _id: Types.ObjectId;
  studentName: string;
  clasName: string;
  streamName: string;
  date: string;
  status: string;
  remarks: string;
}

interface StudentName {
  studentFirstName?: string;
  studentLastName?: string;
}

interface AttendanceEntry {
  _id: Types.ObjectId;
  studentId?: StudentName;
  status: string;
}

interface ClassInfo {
  clasName?: string;
}

interface StreamInfo {
  streamName?: string;
}

interface AttendanceRecord {
  attendance: AttendanceEntry[];
  classRef?: ClassInfo;
  streamId?: StreamInfo;
  date: Date;
  remarks?: string;
}

export class AttendanceRepository {
  /**
   * Create a new attendance record for a class on a specific date
   */
  async create(attendanceData: IAttendance): Promise<IAttendance> {
    const attendance = new AttendanceModel(attendanceData);
    return attendance.save();
  }

  /**
   * Get all attendance records and flatten for the UI
   */
  async findAll(): Promise<AttendanceListItem[]> {
    const records = await AttendanceModel.find()
      .populate("school")
      .populate("classRef")
      .populate("streamId")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName",
      })
      .lean<AttendanceRecord[]>()
      .exec();

    return records.flatMap((record) =>
      record.attendance.map((entry) => ({
        _id: entry._id,
        studentName:
          [
            entry.studentId?.studentFirstName,
            entry.studentId?.studentLastName,
          ]
            .filter(Boolean)
            .join(" ") || "—",
        clasName: record.classRef?.clasName || "—",
        streamName: record.streamId?.streamName || "—",
        date: record.date
          ? new Date(record.date).toISOString().slice(0, 10)
          : "—",
        status: entry.status,
        remarks: record.remarks || "—",
      }))
    );
  }

  /**
   * Get attendance by ID
   */
  async findById(id: string): Promise<IAttendance | null> {
    return AttendanceModel.findById(id)
      .populate("school")
      .populate("classRef")
      .populate("streamId")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName",
      })
      .exec();
  }

  /**
   * Get the unique attendance record for a class, stream, and specific date
   */
  async findByClassStreamAndDate(
    classId: string,
    streamId: string,
    date: Date
  ): Promise<IAttendance | null> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.findOne({
      classRef: classId,
      streamId,
      date: { $gte: start, $lte: end },
    })
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName rollNumber",
      })
      .populate("classRef", "clasName")
      .populate("streamId", "streamName")
      .exec();
  }

  /**
   * Count attendance records for a class on a specific date
   */
  async countByClassAndDate(
    classId: string,
    streamId: string,
    date: Date
  ): Promise<number> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.countDocuments({
      classRef: classId,
      streamId,
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
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .exec();
  }

  /**
   * Update a specific student's attendance status
   */
  async updateStudentStatus(
    attendanceId: string,
    studentId: string,
    status: string,
    updatedBy?: Types.ObjectId
  ): Promise<IAttendance | null> {
    return AttendanceModel.findOneAndUpdate(
      {
        _id: attendanceId,
        "attendance.studentId": studentId,
      },
      {
        $set: {
          "attendance.$.status": status,
          updatedBy,
        },
      },
      { new: true }
    )
      .populate("attendance.studentId")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .exec();
  }

  /**
   * Replace the full attendance array for a class/date
   */
  async updateAttendance(
    attendanceId: string,
    attendanceArray: {
      studentId: Types.ObjectId;
      status: string;
    }[],
    updatedBy: Types.ObjectId,
    remarks?: string
  ): Promise<IAttendance | null> {
    return AttendanceModel.findByIdAndUpdate(
      attendanceId,
      {
        attendance: attendanceArray,
        updatedBy,
        remarks,
      },
      { new: true }
    )
      .populate("attendance.studentId")
      .populate("createdBy", "firstName lastName")
      .populate("updatedBy", "firstName lastName")
      .exec();
  }
  /**
 * Get attendance records for a class + stream within a date range
 */
async findByDateRange(
  classId: string,
  streamId: string,
  startDate: Date,
  endDate: Date
): Promise<IAttendance[]> {
  return AttendanceModel.find({
    classRef: classId,
    streamId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate("classRef")
    .populate("streamId")
    .populate("attendance.studentId")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName")
    .exec();
}

/**
 * Get all attendance records for a specific class (all streams) within a date range
 */
async findByClass(
  classId: string,
  startDate: Date,
  endDate: Date
): Promise<IAttendance[]> {
  return AttendanceModel.find({
    classRef: classId,
    date: {
      $gte: startDate,
      $lte: endDate,
    },
  })
    .populate("classRef")
    .populate("streamId")
    .populate("attendance.studentId")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName")
    .exec();
}

/**
 * Get all attendance records for a specific student
 */
async findByStudent(studentId: string): Promise<IAttendance[]> {
  return AttendanceModel.find({
    "attendance.studentId": studentId,
  })
    .populate("classRef")
    .populate("streamId")
    .populate("attendance.studentId")
    .populate("createdBy", "firstName lastName")
    .populate("updatedBy", "firstName lastName")
    .exec();
}

  /**
   * Delete attendance by ID
   */
  async delete(attendanceId: string): Promise<IAttendance | null> {
    return AttendanceModel.findByIdAndDelete(attendanceId).exec();
  }
}