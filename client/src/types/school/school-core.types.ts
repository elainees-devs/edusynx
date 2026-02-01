// client/src/types/school/school-core.types.ts
import type { BaseDocument } from "../common/base.types";
import type { Student } from "../people/student.types";

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
  school: string | {
    _id: string;
    name: string;
  }
  streamName: string
  academicYear: string
}

export interface IClass {
  _id: string;
  clasName: string;
  school: string | {
    _id: string;
    name: string;
  }
  academicYear: string;
  students?: Array<string | Student>;
}

export interface ISubject{
  _id: string
  subjectName: string
  classRef: string | IClass
   school: string | {
    _id: string;
    name: string;
  }
}
export interface SubjectData extends ISubject {
  school: string;
}

export interface Option {
  value: string;
  label: string;
}

export interface SubjectFormContextType {
  formData: SubjectData;
  updateForm: (data: Partial<SubjectData>) => void;
  resetForm: () => void;
  classOptions: Option[];
  loading: boolean;
  error?: string;
}



