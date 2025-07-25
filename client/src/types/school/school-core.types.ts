// client/src/types/school/school-core.types.ts
import type { BaseDocument } from "../common/base.types";

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

export interface IStream extends BaseDocument{
  _id: string
  school: string
  streamName: string
  academicYear: string
}
export interface IClass extends BaseDocument {
school: string
grade: string
stream: string
academicYear: string
}


