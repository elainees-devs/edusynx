// client/src/types/school/AcademicTypes.ts
import type { IStaff } from "../people/StaffTypes";
import type { IClass, ISchool, IStream } from "./SchoolCoreTypes";

export interface IDepartment {
  school: string | ISchool;
  departmentName: string;
  headOfDepartment?: string | IStaff;
  teachers?: string | IStaff[];
}

export interface IClassTeacher {
  teacher: string | IStaff;
  grade: string | IClass;
  stream: string | IStream;
  totalStudents: number;
}

export interface ClassTeacher extends IClassTeacher {
  _id: string;
}
