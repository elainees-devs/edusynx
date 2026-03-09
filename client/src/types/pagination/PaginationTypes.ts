// client/src/types/pagination/PaginationTypes.ts
import type { Student } from "../people/StudentTypes";
import type { Guardian } from "../people/UserTypes";
import type { Teacher } from "../school/Allocation";
import type { IAttendance } from "../school/AttendanceTypes";
import type { IClass, IStream, ISubject } from "../school/SchoolCoreTypes";


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





