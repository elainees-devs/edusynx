//src/repository/attendance.repository.ts
import { CreateAttendanceDTO } from "../dto/entity.dto";
import { Attendance } from "../models/attendance.model";
import { IAttendance } from "../types";

export class AttendanceRepository {
  async create(attendanceData: CreateAttendanceDTO): Promise<IAttendance> {
    const attendance = new Attendance(attendanceData);
    return await attendance.save();
  }

  async updateById(
    id: string,
    updates: Partial<IAttendance>
  ): Promise<IAttendance | null> {
    return await Attendance.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();
  }

  async findById(id: string): Promise<IAttendance | null> {
    return await Attendance.findById(id)
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findAll(): Promise<IAttendance[]> {
    return await Attendance.find()
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async deleteById(id: string): Promise<IAttendance | null> {
    return await Attendance.findByIdAndDelete(id).exec();
  }
  async deleteAll(): Promise<void> {
    await Attendance.deleteMany({}).exec();
  }
  async findByClassAndDate(
    classId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await Attendance.findOne({ classRef: classId, date })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findBySchoolAndYear(
    schoolId: string,
    schoolYear: string
  ): Promise<IAttendance[]> {
    return await Attendance.find({ school: schoolId, schoolYear })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findByStudentAndDate(
    studentId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await Attendance.findOne({ "attendance.studentId": studentId, date })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
}
