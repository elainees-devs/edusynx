// server/src/types/school/academic.types.ts
import type { BaseDocument } from "../common/base.types";
import type { ITeacher } from "../people/user.types";
import type { IClass, ISchool } from "./school-core.types";


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