// server/src/repositories/people/student.repository.ts
import mongoose from "mongoose";
import crypto from "crypto";
import { IClass, IStream, IStudent } from "../../types";
import { ClassModel, StudentModel } from "../../models";
import { generateAdmissionNumber } from "../../utils";

export class StudentRepository {
  // ===============================
  // CREATE STUDENT
  // ===============================
  async generateAdmissionNumberAndCreateStudent(reqBody: any) {
    const {
      studentFirstName,
      studentMiddleName,
      studentLastName,
      studentGender,
      clasName,
      stream, 
      status,
      previousSchool,
      dateOfBirth,
      school,
    } = reqBody;

    if (!clasName || !stream) {
      throw new Error("Grade and Stream are required");
    }

    // Find class by grade (stream is now separate)
    let classDoc = await ClassModel.findOne({
      grade: clasName,
      school: school,
    });

    // Optional: auto-create class if it doesn't exist
    if (!classDoc) {
      classDoc = await ClassModel.create({
        clasName,
        stream: stream.toLowerCase(),
        school,
      });
    }

    // Generate admission number
    const createdAdm = await generateAdmissionNumber(new mongoose.Types.ObjectId(school));

    // Create student
    const student = new StudentModel({
      studentFirstName,
      studentMiddleName,
      studentLastName,
      studentGender,
      classId: classDoc._id, // reference class
      stream: stream.toLowerCase(), // store separately as string
      status,
      previousSchool,
      admissionDate: new Date(),
      dateOfBirth,
      adm: createdAdm,
      school: new mongoose.Types.ObjectId(school),
      studentId: crypto.randomUUID(),
    });

    await student.save();
    return student;
  }

  // ===============================
  // GET ALL STUDENTS
  // ===============================
  async findAllStudents() {
  const students = await StudentModel.find()
    .populate({
      path: "classId",
      select: "clasName", // only return grade
    })
    .populate({
      path: "stream",
      select: "streamName", // only return streamName
    });

  return students.map((s) => {
    // Narrow classId type
    let classId: string | undefined;
     let clasName: string | undefined;

    if (s.classId && typeof s.classId !== "string") {
      // populated document
      classId = (s.classId as IClass)._id.toString();
      clasName = (s.classId as IClass).clasName;
    } else if (typeof s.classId === "string") {
      // not populated, just ObjectId string
      classId = s.classId;
      clasName = undefined;
    }

    // Narrow stream type
    let stream: string | undefined;
    let streamName: string | undefined;

    if (s.stream && typeof s.stream !== "string") {
      stream = (s.stream as IStream)._id.toString();
      streamName = (s.stream as IStream).streamName;
    } else if (typeof s.stream === "string") {
      stream = s.stream;
      streamName = undefined;
    }

    return {
      _id: s._id,
      studentFirstName: s.studentFirstName,
      studentMiddleName: s.studentMiddleName,
      studentLastName: s.studentLastName,
      studentGender: s.studentGender,
      dateOfBirth: s.dateOfBirth,
      admissionDate: s.admissionDate,
      status: s.status,
      previousSchool: s.previousSchool,
      adm: s.adm,
      studentId: s.studentId,
      school: s.school,
      classId,
      clasName,
      stream,
      streamName,
    };
  });
}


  // ===============================
  // GET ACTIVE STUDENTS
  // ===============================
  async findActiveStudents() {
    const students = await StudentModel.find({ status: "active" }).populate({
      path: "classId",
      select: "clasName",
    });


    return students.map((s) => {
      const classDoc = s.classId as IClass; // cast
        return {
          ...s.toObject(),
          clasName: classDoc?.clasName,
          stream: s.stream,
          classId: undefined,
        };
      });
    }

  // ===============================
// GET STUDENT WITH GUARDIAN
// ===============================
async findStudentWithGuardianById(id: string) {
  const student = await StudentModel.findById(id)
    .populate({
      path: "classId",
      select: "clasName",
    })
    .populate({
      path: "stream",
      select: "streamName",
    });

  if (!student) return null;

  // Narrow classId
  let clasName: string | undefined;
  let classId: string | undefined;

  if (student.classId && typeof student.classId !== "string") {
    clasName = (student.classId as IClass).clasName;
    classId = (student.classId as IClass)._id.toString();
  } else if (typeof student.classId === "string") {
    classId = student.classId;
    clasName = undefined;
  }

  // Narrow stream
  let streamId: string | undefined;
  let streamName: string | undefined;

  if (student.stream && typeof student.stream !== "string") {
    streamId = (student.stream as IStream)._id.toString();
    streamName = (student.stream as IStream).streamName;
  } else if (typeof student.stream === "string") {
    streamId = student.stream;
    streamName = undefined;
  }

  return {
    ...student.toObject(),
    clasName,
    streamId,
    streamName,
    classId: undefined, // hide original populated classId
  };
}


  // ===============================
  // DELETE / UPDATE / COUNT
  // ===============================
  async deleteStudentById(id: string) {
    return StudentModel.findByIdAndDelete(id);
  }

  async deleteAllStudents() {
    return StudentModel.deleteMany({});
  }

  async updateStudentById(id: string, data: Partial<IStudent>) {
    return StudentModel.findByIdAndUpdate(id, data, { new: true }).populate({
      path: "classId",
      select: "clasName",
    });
  }

  async countStudents(id?: string) {
    if (!id) return StudentModel.countDocuments({});
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return StudentModel.countDocuments({ _id: id });
  }

  async getAllStudentNames() {
    const students = await StudentModel.find(
      {},
      "studentFirstName studentMiddleName studentLastName"
    );

    return students.map((s) => ({
      _id: s._id,
      fullName: `${s.studentFirstName} ${s.studentMiddleName ?? ""} ${s.studentLastName}`.trim(),
    }));
  }
}

export const studentRepo = new StudentRepository();
