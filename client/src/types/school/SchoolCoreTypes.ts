// client/src/types/school/SchoolCoreTypes.ts
import type { BaseDocument } from "../common/BaseTypes";
import type { Student } from "../people/StudentTypes";
export interface ISchool extends BaseDocument {
  _id: string;
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
  subscription: {
    _id: string;
    planId: {
      _id: string;
      name: string;
      price: number;
      durationInMonths: number;
    };
    startDate: Date;
    endDate: Date;
    isActive: boolean;
  };
}

export interface IStream {
  _id: string;
  school:
  | string
  | {
    _id: string;
    name: string;
  };
  streamName: string;
  academicYear: string;
}

export interface IClass {
  _id: string;
  clasName: string;
  school:
  | string
  | {
    _id: string;
    name: string;
  };
  academicYear: string;
  students?: Array<string | Student>;
}

export interface ISubject {
  _id: string;
  subjectName: string;
  classRef: string | IClass;
  school:
  | string
  | {
    _id: string;
    name: string;
  };
}
export interface SubjectData {
  _id: string;
  subjectName: string;
  classRef: string | IClass;
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

