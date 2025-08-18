// server/src/types/school/school-core.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ITeacher } from "../people/user.types";
import { IStudent } from "../people/student.types";

export interface ISchool extends BaseDocument {
  name: string
  address: string
  phoneNumber: string
  email: string
  website?: string
  establishedYear: number
  logoUrl?: string
  isActive: boolean
  schoolCode: string
  slug?: string
  role: string
  accessUrl?: string
}
export interface IStream extends BaseDocument{
  school: Types.ObjectId | ISchool
  streamName: string
  academicYear: string
}
export interface IClass extends BaseDocument {
  school: Types.ObjectId | ISchool
  grade: string
  stream: Types.ObjectId | IStream
  academicYear: string
  classTeacher?: Types.ObjectId | ITeacher
  students?: Array<Types.ObjectId | IStudent >
}

