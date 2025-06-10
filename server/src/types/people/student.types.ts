//src/types/people/student.types.ts
import { Types } from "mongoose";
import { IBaseUser } from "./user.types";
import { StudentGender, StudentStatus } from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool } from "../school/school-core.types";

export interface IStudent extends BaseDocument{
  school: string | ISchool;
  studentFirstName: string;
  studentMiddleName: string;
  studentLastName: string;
  studentGender: StudentGender;
  dateOfBirth: Date;
  adm: number;
  admissionDate: Date;
  previousSchool?: string;
  guardian: Types.ObjectId | IBaseUser;
  classId: Types.ObjectId | IClass;
  status: StudentStatus;
  studentId?: string;
}
