//src/repositories/student.repository.ts
import mongoose from "mongoose";
import { CreateStudentDTO } from "../dto/entity.dto";
import { IStudent } from "../types";
import { Class, Student } from "../models";

export class StudentRepository {
  async findAllStudents() {
    return await Student.find().populate("school");
  }

  async findStudentWithGuardianById(id: string) {
    return await Student.findById(id).populate("guardian");
  }

  async findStudentNameById(id: string) {
    const student = await Student.findById(id);
    return student ? `${student.firstName} ${student.lastName}` : null;
  }

  async findStudentsByClassName(className: string) {
    const classObj = await Class.findOne({ className });
    if (!classObj) return null;
    return await Student.find({ class: classObj._id }).populate("school");
  }

  async createStudent(studentData: CreateStudentDTO) {
    const student = new Student(studentData);
    return await student.save();
  }

  async deleteStudentById(id: string) {
    return await Student.findByIdAndDelete(id);
  }

  async deleteAllStudents() {
    return await Student.deleteMany({});
  }

  async updateStudentById(id: string, data: Partial<IStudent>) {
    return await Student.findByIdAndUpdate(id, data, { new: true });
  }

  async countStudents(id?: string) {
    if (!id) return await Student.countDocuments({});
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Student.countDocuments({ _id: id });
  }

  async getAllStudentNames() {
    const students = await Student.find({}, "firstName middleName lastName");
    return students.map((student) => ({
      _id: student._id,
      fullName: `${student.firstName} ${student.middleName} ${student.lastName}`,
    }));
  }
}
