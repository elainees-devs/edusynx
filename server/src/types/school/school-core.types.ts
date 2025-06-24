// server/src/types/school/school-core.types.ts

import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { IBaseUser } from "../people/user.types";

export interface ISchool extends BaseDocument {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website?: string;
  establishedYear: number;
  logoUrl?: string;
  isActive: boolean;
  schoolCode: string;
  slug?: string;
  role: string;
}

export interface IClass extends BaseDocument {
  school: Types.ObjectId | ISchool;
  className: string;
  stream: string;
  academicYear: string;
}

export interface ISubject extends BaseDocument {
  school: Types.ObjectId | ISchool;
  subjectName: string;
  classRef: Types.ObjectId | IClass;
}

export interface ITeacherSubject extends BaseDocument {
  school: Types.ObjectId | ISchool;
  teacherId: Types.ObjectId | IBaseUser;
  subjectId: Types.ObjectId | ISubject;
}
