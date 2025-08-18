// client/src/types/school/school-core.types.ts
import type { BaseDocument } from "../common/base.types";
import type { Student } from "../people/student.types";
import type { ITeacher } from "../people/user.types";

export interface ISchool extends BaseDocument {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website?: string;
  establishedYear: number;
  logoUrl: string;
  isActive: boolean;
  schoolCode: string;
  role?: string;
  accessUrl?: string;
}

export interface IStream{
  _id: string
  school: string
  streamName: string
  academicYear: string
}
export interface IClass {
  _id: string;
  grade: string;
  stream: string | {
    _id: string;
    streamName: string
  };
  school: string | {
    _id: string;
    name: string;
  };
  academicYear: string;
  classTeacher?: string | ITeacher
  students?: Array<string | Student>
}



