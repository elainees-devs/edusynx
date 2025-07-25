// server/src/types/school/academics.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool } from "./school-core.types";
import { IBaseUser, ITeacher } from "../people/user.types";

export interface IDepartment{
  school: string | ISchool
  departmentName: string;
  headOfDepartment?:string | ITeacher
  teachers?: string | ITeacher[]
}
export interface ISubject extends BaseDocument {
  school: Types.ObjectId | ISchool
  subjectName: string
  classRef: Types.ObjectId | IClass
}

export interface ITeacherSubject extends BaseDocument {
  school: Types.ObjectId | ISchool;
  teacherId: Types.ObjectId | IBaseUser
  subjectId: Types.ObjectId | ISubject
}