// server/src/types/school/academic.types.ts
import type { ITeacher } from "../people/UserTypes";
import type { IClass, ISchool, IStream } from "./SchoolCoreTypes";

export interface IDepartment {
  school: string | ISchool;
  departmentName: string;
  headOfDepartment?: string | IClassTeacher;
  teachers?: string | ITeacher[];
}

export interface IClassTeacher {
  teacher: string | ITeacher;
  grade: string | IClass;
  stream: string | IStream;
  totalStudents: number;
}

export interface ClassTeacher extends IClassTeacher {
  _id: string;
}
