// server/src/repositories/people/student.repository.ts
import mongoose from "mongoose";
import { IStudent } from "../../types";
import { ClassModel, StudentModel } from "../../models";
import { CreateStudentDTO } from "../../dto";
import { generateAdmissionNumber } from "../../utils";

export class StudentRepository {

  // Create student and associate with guardian
  async generateAdmissionNumberAndCreateStudent(reqBody: any, guardian: any) {
    const {
      studentFirstName,
      studentLastName,
      studentGender,
      clas,
      previousSchool,
      dateOfBirth,
    } = reqBody;

    const schoolObjectId = new mongoose.Types.ObjectId(guardian.school._id);
      // Generate the next admission number
    const createdAdm = await generateAdmissionNumber(schoolObjectId);

    const student = new StudentModel({
      studentFirstName,
      studentLastName,
      studentGender,
      school: guardian.school._id,
      clas,
      previousSchool,
      registrationDate: Date.now(),
      dateOfBirth,
      adm: createdAdm,
      guardian: guardian._id,
    });

    await student.save();
    return student;
  }

  async findAllStudents() {
    return await StudentModel.find().populate("school");
  }

  async findStudentWithGuardianById(id: string) {
    return await StudentModel.findById(id).populate("guardian");
  }

  async findStudentNameById(id: string) {
    const student = await StudentModel.findById(id);
    return student
      ? `${student.studentFirstName} ${student.studentLastName}`
      : null;
  }

  async findStudentsByClassName(className: string) {
    const classObj = await ClassModel.findOne({ className });
    if (!classObj) return null;
    return await StudentModel.find({ clas: classObj._id }).populate("school");
  }

  async createStudent(studentData: CreateStudentDTO) {
    const student = new StudentModel(studentData);
    return await student.save();
  }

  async deleteStudentById(id: string) {
    return await StudentModel.findByIdAndDelete(id);
  }

  async deleteAllStudents() {
    return await StudentModel.deleteMany({});
  }

  async updateStudentById(id: string, data: Partial<IStudent>) {
    return await StudentModel.findByIdAndUpdate(id, data, { new: true });
  }

  async countStudents(id?: string) {
    if (!id) return await StudentModel.countDocuments({});
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await StudentModel.countDocuments({ _id: id });
  }

  async getAllStudentNames() {
    const students = await StudentModel.find({}, "studentFirstName studentMiddleName studentLastName");
    return students.map((s) => ({
      _id: s._id,
      fullName: `${s.studentFirstName} ${s.studentMiddleName ?? ""} ${s.studentLastName}`.trim(),
    }));
  }
}
