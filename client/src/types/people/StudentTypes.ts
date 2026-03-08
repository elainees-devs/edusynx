// client/src/types/people/student.types.ts

import type { Guardian } from "./user.types";
import type { Option } from "../school/school-core.types";

export type StudentGender = "male" | "female";
export type StudentStatus = "Active" | "Inactive" | "Suspended" | "Graduated";


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
  guardianId?: string | Guardian;
}

export interface StudentFormContextType {
  formData: StudentFormData;
  updateForm: (data: Partial<StudentFormData>) => void;
  resetForm: () => void;
  classOptions: Option[];
  loading: boolean;
  error?: string;
}

export interface Student extends StudentFormData {
  _id: string; 
}

