// server/src/tests/unit/controllers/__mocks__/student.mock.ts
import { Types } from "mongoose";
import { Gender, IStudent, StudentStatus } from "../../../../types";

export const mockStudentData = (): IStudent => ({
  _id: new Types.ObjectId(),
  school: new Types.ObjectId().toHexString(), // string ID to satisfy IStudent
  studentFirstName: "John",
  studentMiddleName: "Michael",
  studentLastName: "Doe",
  studentGender: Gender.MALE,
  dateOfBirth: new Date("2010-05-15"),
  adm: 12345,
  admissionDate: new Date("2020-01-10"),
  previousSchool: "Sunrise Primary School",
  guardian: new Types.ObjectId(), // ObjectId to satisfy IBaseUser
  classId: new Types.ObjectId(), // ObjectId to satisfy IClass
  stream: new Types.ObjectId(), // ObjectId to satisfy IStream
  status: StudentStatus.ACTIVE,
  studentId: "STU-2025-001",
  familyNumber: 1,
  studentPhotoUrl: "https://example.com/student-photo.jpg",
  createdAt: new Date(),
  updatedAt: new Date(),
});
