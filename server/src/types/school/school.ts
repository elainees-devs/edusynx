//src/types/school/school.ts

import { Types } from "mongoose";
import { IStudent } from "../people/student";
import { Term } from "../term";

export enum ExamType {
  Internal = "internal",
  External = "external",
}

export enum AttendanceStatus {
  Present = "present",
  Absent = "absent",
}




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

export interface IAttendance {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  class: Types.ObjectId | IClass;
  school_year: string;
  date: Date;
  attendance: {
    studentId: Types.ObjectId | IStudent;
    status: AttendanceStatus;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IExamResult {
  _id: Types.ObjectId;
  school: Types.ObjectId | ISchool;
  exam: Types.ObjectId | IExam;
  student: Types.ObjectId | IStudent;
  subjects: Types.ObjectId | ISubject[];
  marks: number;
  grade: string;
  comments?: string;
  createdAt: Date;
  updatedAt: Date;
}
