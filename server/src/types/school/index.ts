//src/types/school/index.ts

import { Types } from "mongoose";

export type ExamType = "internal" | "external";
export type Term = "Term 1" | "Term 2" | "Term 3";

export interface ISchool {
  _id: Types.ObjectId;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website?: string;
  establishedYear: number;
  logo_url: string;

  isActive: boolean;
  school_code: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IClass {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  class_name: string;
  stream: string;
  class_teacher: string;
  academic_year: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubject {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  subject_name: string;
  class: Types.ObjectId | IClass;
  createdAt: Date;
  updatedAt: Date;
}

export interface IExam {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  exam_name: string;
  class: Types.ObjectId | IClass;
  subject: Types.ObjectId | ISubject;
  exam_date: Date;
  academic_year: string;
  term: Term;
  exam_type: ExamType;
  createdAt: Date;
  updatedAt: Date;
}
