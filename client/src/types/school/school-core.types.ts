// client/src/types/school/school-core.types.ts
import type { BaseDocument } from "../common/base.types";
import type { IBaseUser } from "../people/user.types";

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

export interface IClass extends BaseDocument {
  id: string;
  ClassName: string;
  stream: string;
  academicYear: string;
}

export interface ISubject extends BaseDocument {
  school: string | ISchool;
  subjectName: string;
  classRef: string | IClass;
}

export interface ITeacherSubject extends BaseDocument {
  school: string | ISchool;
  teacherId: string | IBaseUser;
  subjectId: string | ISubject;
}
