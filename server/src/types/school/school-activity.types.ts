// src/types/school/school-activity.types.ts

import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { IStudent } from "../people/student.types";
import { IBaseUser } from "../people/user.types";
import { Term, ExamType, AttendanceStatus } from "../enum/enum";
import { ISchool, IClass } from "./school-core.types";
import { ISubject } from "./academic.types";

export interface IExam extends BaseDocument {
  school: Types.ObjectId | ISchool;
  examName: string;
  classRef: Types.ObjectId | IClass;
  subject: Types.ObjectId | ISubject;
  examDate: Date;
  academicYear: string;
  term: Term;
  examType: ExamType;
}

export interface IExamResult extends BaseDocument {
  school: Types.ObjectId | ISchool;
  exam: Types.ObjectId | IExam;
  student: Types.ObjectId | IStudent;
  subject: Types.ObjectId | ISubject;
  marks: number;
  grade: string;
  comments?: string;
}

export interface IAttendance extends BaseDocument {
  school: Types.ObjectId | ISchool;
  classRef: Types.ObjectId | IClass;
  schoolYear: string;
  date: Date;
  attendance: {
    studentId: Types.ObjectId | IStudent;
    status: AttendanceStatus;
  }[];
}

export interface IEvent extends BaseDocument {
  school: Types.ObjectId | ISchool;
  eventTitle: string;
  eventDescription: string;
  startDate: Date;
  endDate: Date;
  location?: string;
  isAllDay: boolean;
  createdBy: Types.ObjectId | IBaseUser;
  attendees?: (Types.ObjectId | IBaseUser)[];
  eventType: string; // e.g., "meeting", "holiday", "exam"
}

export interface INotification extends BaseDocument {
  school: Types.ObjectId | ISchool;
  notificationTitle: string;
  message: string;
  recipient: Types.ObjectId | IBaseUser;
  isRead: boolean;
  readAt?: Date;
}
