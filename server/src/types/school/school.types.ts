//src/types/school/school.types.ts

import { Types } from "mongoose";
import { IStudent } from "../people/student.types";
import { AttendanceStatus, ExamType, Term } from "../enum/enum";
import { BaseDocument } from "../common/base.types";

export interface ISchool extends BaseDocument {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  website?: string;
  establishedYear: number;
  logo_url: string;
  isActive: boolean;
  school_code: string;
}

export interface IClass extends BaseDocument {
  school: Types.ObjectId | ISchool;
  className: string;
  stream: string;
  academicYear: string;
}

export interface ISubject extends BaseDocument {
  school: Types.ObjectId | ISchool;
  subject_name: string;
  class: Types.ObjectId | IClass;
}

export interface IExam extends BaseDocument {
  school: Types.ObjectId | ISchool;
  examName: string;
  class: Types.ObjectId | IClass;
  subject: Types.ObjectId | ISubject;
  exam_date: Date;
  academic_year: string;
  term: Term;
  examType: ExamType;
}

export interface IAttendance extends BaseDocument {
  school: Types.ObjectId | ISchool;
  class: Types.ObjectId | IClass;
  schoolYear: string;
  date: Date;
  attendance: {
    studentId: Types.ObjectId | IStudent;
    status: AttendanceStatus;
  }[];
}

export interface IExamResult extends BaseDocument {
  school: Types.ObjectId | ISchool;
  exam: Types.ObjectId | IExam;
  student: Types.ObjectId | IStudent;
  subjects: Types.ObjectId | ISubject[];
  marks: number;
  grade: string;
  comments?: string;
}
