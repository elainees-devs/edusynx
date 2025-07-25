// server/src/types/school/academic.types.ts
import type { UserRole } from "../../constants";
import type { BaseDocument } from "../common/base.types";
import type { IBaseUser } from "../people/user.types";
import type { IClass, ISchool } from "./school-core.types";

export type ITeacher = Pick<IBaseUser, "school" | "firstName" | "middleName" | "lastName"> & {
  role: typeof UserRole["TEACHER"];
};

export interface IDepartment{
  school: string | ISchool
  departmentName: string;
  headOfDepartment?:string | ITeacher
  teachers?: string | ITeacher[]
}
export interface ISubject extends BaseDocument {
  school: string | ISchool
  subjectName: string
  departmentRef: string | IDepartment
  classRef: string | IClass
  teachers?: ITeacher[]
}