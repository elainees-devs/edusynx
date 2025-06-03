//src/repositories/attendance.repository.ts
import { CreateAttendanceDTO } from "../dto/entity.dto";
import { AttendanceModel } from "../models";
import { IAttendance } from "../types";

export class AttendanceRepository {
  async create(attendanceData: CreateAttendanceDTO): Promise<IAttendance> {
    const attendance = new AttendanceModel(attendanceData);
    return await attendance.save();
  }

  async updateById(
    id: string,
    updates: Partial<IAttendance>
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();
  }

  async findById(id: string): Promise<IAttendance | null> {
    return AttendanceModel.findById(id)
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findAll(): Promise<IAttendance[]> {
    return await AttendanceModel.find()
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async deleteById(id: string): Promise<IAttendance | null> {
    return await AttendanceModel.findByIdAndDelete(id).exec();
  }
  async deleteAll(): Promise<void> {
    await AttendanceModel.deleteMany({}).exec();
  }
  async findByClassAndDate(
    classId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findOne({ classRef: classId, date })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findBySchoolAndYear(
    schoolId: string,
    schoolYear: string
  ): Promise<IAttendance[]> {
    return await AttendanceModel.find({ school: schoolId, schoolYear })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
  async findByStudentAndDate(
    studentId: string,
    date: Date
  ): Promise<IAttendance | null> {
    return await AttendanceModel.findOne({ "attendance.studentId": studentId, date })
      .populate("classRef", "name")
      .populate("attendance.studentId", "name")
      .exec();
  }
}
