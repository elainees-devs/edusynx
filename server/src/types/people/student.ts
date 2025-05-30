//src/types/people/student.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school";
import { IBaseUser } from "./user";

export type StudentGender = "boy" | "girl";
export type StudentStatus = "active" | "inactive" | "completed" | "transferred";

export interface IStudent {
  school: string | ISchool;
  first_name: string;
  middle_name: string;
  last_name: string;
  student_gender: StudentGender;
  date_of_birth: Date;
  adm: number;
  admission_date: Date;
  previuosSchool?: string;
  guardian: Types.ObjectId | IBaseUser;
  class: Types.ObjectId | IClass;
  status: StudentStatus;
  studentId?: string;
  createdAt: Date;
  updatedAt: Date;
}
