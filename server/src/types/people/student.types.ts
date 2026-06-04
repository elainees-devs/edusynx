//src/types/people/student.types.ts
import { Types } from "mongoose";
import { IBaseUser } from "./user.types";
import { Gender, StudentStatus } from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool, IStream } from "../school/school-core.types";

export type HistoryAction = "admitted" | "promoted" | "transferred" | "graduated";

export interface IStatusChange {
  action: HistoryAction;
  fromClass?: Types.ObjectId | string;
  toClass?: Types.ObjectId | string;
  fromStream?: Types.ObjectId | string;
  toStream?: Types.ObjectId | string;
  academicYear?: string;
  reason?: string;
  date: Date;
}

export interface IStudent extends BaseDocument{
  school: string | ISchool
  studentFirstName: string
  studentMiddleName: string
  studentLastName: string
  studentGender: Gender
  dateOfBirth: Date
  adm: number
  admissionDate: Date
  previousSchool?: string
  guardians: Types.ObjectId[] | IBaseUser[]
  classId: Types.ObjectId | IClass
  stream: Types.ObjectId | IStream
  status: StudentStatus
  studentId?: string
  familyNumber?: number
  studentPhotoUrl?: string
  history?: IStatusChange[]
}
