// client/src/types/people/StudentTypes.ts
import type { Option } from "../school/SchoolCoreTypes";
import type { Guardian } from "./UserTypes";

export type StudentGender = "male" | "female";
export type StudentStatus = "active" | "transferred" | "graduated";

export interface StudentFormData {
  school: string;
  studentFirstName: string;
  studentMiddleName: string;
  studentLastName: string;
  studentGender: StudentGender;
  dateOfBirth: string;
  admissionDate: string;
  previousSchool?: string;
  classId: string;
  clasName?: string;
  stream: string;
  streamName?: string;
  status: StudentStatus;
  studentPhotoUrl: string | undefined;
  adm?: string;
  guardians?: string[] | Guardian[];
  familyNumber?: string;
}

export interface StudentFormContextType {
  formData: StudentFormData;
  updateForm: (data: Partial<StudentFormData>) => void;
  resetForm: () => void;
  classOptions: Option[];
  loading: boolean;
  error?: string;
}

export interface StudentHistoryEntry {
  _id: string;
  action: "promoted" | "transferred" | "graduated" | "admitted";
  fromClass?: string;
  toClass?: string;
  fromStream?: string;
  toStream?: string;
  academicYear?: string;
  reason?: string;
  date: string;
}

export interface Student extends StudentFormData {
  _id: string;
  history?: StudentHistoryEntry[];
}
