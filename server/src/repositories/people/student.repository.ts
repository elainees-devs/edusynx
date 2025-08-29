// server/src/repositories/people/student.repository.ts
import mongoose from "mongoose";
import { IStudent } from "../../types";
import { ClassModel, StudentModel } from "../../models";
import { generateAdmissionNumber } from "../../utils";

export class StudentRepository {
  // 1. Method to generate admission number and create a student
  async generateAdmissionNumberAndCreateStudent(reqBody: any) {
    const {
      studentFirstName,
      studentMiddleName,
      studentLastName,
      studentGender,
      classId,
      status,
      previousSchool,
      stream,
      dateOfBirth,
      school,
    } = reqBody;

    // Generate the next admission number
    const createdAdm = await generateAdmissionNumber(
      new mongoose.Types.ObjectId(school)
    );

    // Create new student document
    const student = new StudentModel({
      studentFirstName,
      studentMiddleName,
      studentLastName,
      studentGender,
      classId,
      status,
      stream,
      previousSchool,
      admissionDate: Date.now(),
      dateOfBirth,
      adm: createdAdm,
     school: new mongoose.Types.ObjectId(school),
      studentId: crypto.randomUUID(), // <-- make it unique
    });

    // Save student to database
    await student.save();

    return student;
  }

  // 2. Method to find all students
  async findAllStudents() {
    return await StudentModel.find()
     .populate({
    path:"classId",
    select:"grade",
    model: "Class"
  
  })
     .populate("stream");
} 
 
  // 3. Method to find Student by Guardian ID
  async findStudentWithGuardianById(id: string) {
    return await StudentModel.findById(id).populate("guardian");
  }

  // // 4. Method to find Student by ID
  // async findStudentNameById(id: string) {
  //   const student = await StudentModel.findById(id);
  //   return student
  //     ? `${student.studentFirstName} ${student.studentLastName}`
  //     : null;
  // }

  
  // Method to find all active students
async findActiveStudents() {
  return await StudentModel.find({ status: "active" })
    .populate("classId")
    .populate("stream")
    // .populate("guardianId");
}


  // 5. Method to find students by class name
  async findStudentsByClassName(className: string) {
    const classObj = await ClassModel.findOne({ className });
    if (!classObj) return null;
    return await StudentModel.find({ clas: classObj._id }).populate("school");
  }

  // 6. Method to delete a student by ID
  async deleteStudentById(id: string) {
    return await StudentModel.findByIdAndDelete(id);
  }

  // 7. Method to delete all students
  async deleteAllStudents() {
    return await StudentModel.deleteMany({});
  }

  // 8. Method to update a student by ID
  async updateStudentById(id: string, data: Partial<IStudent>) {
    return await StudentModel.findByIdAndUpdate(id, data, { new: true });
  }

  // 9. Method to count students
  async countStudents(id?: string) {
    if (!id) return await StudentModel.countDocuments({});
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await StudentModel.countDocuments({ _id: id });
  }

  // 10. Method to get all student names
  async getAllStudentNames() {
    const students = await StudentModel.find(
      {},
      "studentFirstName studentMiddleName studentLastName"
    );
    return students.map((s) => ({
      _id: s._id,
      fullName: `${s.studentFirstName} ${s.studentMiddleName ?? ""} ${
        s.studentLastName
      }`.trim(),
    }));
  }
}
