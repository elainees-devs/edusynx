//src/types/people/student.types.ts
import { Types } from "mongoose";
import { IClass, ISchool } from "../school/school.types";
import { IBaseUser } from "./user.types";
import { StudentGender, StudentStatus } from "../enum/enum";
import { BaseDocument } from "../common/base.types";

export interface IStudent extends BaseDocument{
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
}
