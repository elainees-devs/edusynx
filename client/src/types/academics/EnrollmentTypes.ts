export type EnrollmentStatus = "active" | "transferred" | "withdrawn" | "graduated";
export type EnrollmentType = "new" | "re-enrollment" | "promotion";

export interface IEnrollment {
  _id: string;
  school: string;
  student: string;
  clas: string;
  stream: string;
  academicYear: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  enrollmentType: EnrollmentType;
  remarks?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateEnrollmentPayload {
  school: string;
  student: string;
  clas: string;
  stream: string;
  academicYear: string;
  enrollmentDate: string;
  status: EnrollmentStatus;
  enrollmentType: EnrollmentType;
  remarks?: string;
}

export interface UpdateEnrollmentPayload {
  student?: string;
  clas?: string;
  stream?: string;
  academicYear?: string;
  enrollmentDate?: string;
  status?: EnrollmentStatus;
  enrollmentType?: EnrollmentType;
  remarks?: string;
}
