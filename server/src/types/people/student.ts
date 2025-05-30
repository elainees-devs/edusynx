// src/types/people/student.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school";
import { IBaseUser } from "./user";
import { StudentGender, StudentStatus } from "../enum/enum";

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
