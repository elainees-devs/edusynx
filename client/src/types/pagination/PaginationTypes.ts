// client/src/types/pagination/pagination.types.ts
import type { Student } from "../people/student.types";
import type { Guardian } from "../people/user.types";
import type { Teacher } from "../school/allocation";
import type { IAttendance, IClass, IStream, ISubject } from "../school/school-core.types";

export interface GetPageParams{
  page: number
  limit: number
  search?: string
  sort?: "asc"|"desc"

}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export type PaginatedStudents = PaginatedResponse<Student>;
export type PaginatedGuardians = PaginatedResponse<Guardian>;
export type PaginatedTeachers = PaginatedResponse<Teacher>;
export type PaginatedClasses = PaginatedResponse<IClass>;
export type PaginatedStreams = PaginatedResponse<IStream>;
export type PaginatedSubjects = PaginatedResponse<ISubject>;
export type PaginatedAttendanceRecords = PaginatedResponse<IAttendance>;





