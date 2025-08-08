// client/src/types/people/student.types.ts
export type StudentGender = "male" | "female";
export type StudentStatus = "Active" | "Inactive" | "Suspended" | "Graduated";

export interface Option {
  value: string;
  label: string;
}

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
  stream: string;
  status: StudentStatus;
  studentPhotoUrl: string | undefined;
  adm?: string;
  guardianId?: string;
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

