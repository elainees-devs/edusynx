// server/src/types/school/academics.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool, IStream } from "./school-core.types";
import { IBaseUser, ITeacher } from "../people/user.types";

export interface IDepartment{
  school: string | ISchool
  departmentName: string;
  headOfDepartment?: (Types.ObjectId | ITeacher)[]
   teachers?: (Types.ObjectId | ITeacher)[]
}
export interface ISubject extends BaseDocument {
  school: Types.ObjectId | ISchool
  subjectName: string
  classRef: Types.ObjectId | IClass
}

export interface ITeacherSubject extends BaseDocument {
  school: Types.ObjectId | ISchool
  teacherId: Types.ObjectId | IBaseUser
  subjectId: Types.ObjectId | ISubject
}

export interface IClassTeacher extends ITeacher, BaseDocument {
  school: Types.ObjectId | ISchool;
  teacher: Types.ObjectId | ITeacher;
  grade: Types.ObjectId| IClass;
  stream: Types.ObjectId | IStream;
  totalStudents: number;
}
