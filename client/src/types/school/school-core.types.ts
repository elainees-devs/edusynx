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

export interface IStudentAttendance {
  studentId?: string; // MongoDB ObjectId of the student
  name?: string; // Optional: student name for display
  status: AttendanceStatus; // Current attendance status
  updatedAt?: string; // ISO timestamp of last update
  notes?: string; // Optional: any remarks about this student's attendance
}

export interface IAttendance {
  _id?: string; // MongoDB ObjectId of the attendance record
  school: string; // MongoDB ObjectId of the school
  stream: string; // MongoDB ObjectId of the stream
  classRef: string; // MongoDB ObjectId of the class
  schoolYear: string; // Academic year (e.g., "2023-2024")
  date: string; // ISO date string for the attendance date
  attendance: IStudentAttendance[]; // Array of student attendance records
  createdAt?: string; // ISO timestamp of record creation
  updatedAt?: string; // ISO timestamp of last update
}
export type AttendanceStatus = "present" | "absent" | "excused" | "late";
