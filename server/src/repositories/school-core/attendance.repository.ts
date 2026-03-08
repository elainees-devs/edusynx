// server/src/repositories/school-core/attendance.repository.ts
import { Types } from "mongoose";
import { IAttendance } from "../../types";
import { AttendanceModel } from "../../models";


export class AttendanceRepository {
  /**
   *  Create a new attendance record for a class on a specific date
   */
  async create(attendanceData: IAttendance): Promise<IAttendance> {
    const attendance = new AttendanceModel(attendanceData);
    return attendance.save();
  }


  /**
   * Get all attendance records and flatten for the UI
   */
  async findAll(): Promise<any[]> {
    const records = await AttendanceModel.find()
      .populate("school")
      .populate("classRef")
      .populate("streamId")
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName"
      })
      .lean()
      .exec();

    return records.flatMap((record: any) =>
      (record.attendance || []).map((entry: any) => ({
        _id: entry._id,
        studentName: [entry.studentId?.studentFirstName, entry.studentId?.studentLastName].filter(Boolean).join(" ") || "—",
        clasName: record.classRef?.clasName || "—",
        streamName: record.streamId?.streamName || "—",
        date: record.date ? new Date(record.date).toISOString().slice(0, 10) : "—",
        status: entry.status,
        notes: entry.notes || "—"
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
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName"
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
    // Normalize date to cover the full 24-hour period of the selected day
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);

    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.findOne({
      classRef: classId,
      streamId: streamId,
      date: { $gte: start, $lte: end },
    })
      .populate({
        path: "attendance.studentId",
        select: "studentFirstName studentLastName rollNumber" // Tailor these to your Student model
      })
      .populate("classRef", "clasName") // Optional: useful for UI breadcrumbs
      .populate("streamId", "streamName")
      .exec();
  }




  /**
   * Count attendance records for a class on a specific date
   */
  async countByClassAndDate(classId: string, streamId: string, date: Date): Promise<number> {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    return AttendanceModel.countDocuments({
      classRef: classId,
      stream: streamId,
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
