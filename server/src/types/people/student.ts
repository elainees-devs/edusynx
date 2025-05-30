// src/types/people/student.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school";
import { IBaseUser } from "./user";

export type StudentGender = "boy" | "girl";
export type StudentStatus = "active" | "inactive" | "completed" | "transferred";

export interface IStudent {
  school: string | ISchool;
  firstName: string;
  middleName: string;
  lastName: string;
  studentGender: StudentGender;
  dateOfBirth: Date;
  adm: number;
  admissionDate: Date;
  previousSchool?: string;
  guardian: Types.ObjectId | IBaseUser;
  class: Types.ObjectId | IClass;
  status: StudentStatus;
  studentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
