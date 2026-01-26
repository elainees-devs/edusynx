// client/src/types/pagination/pagination.types.ts
import type { Student } from "../people/student.types";
import type { ITeacher } from "../people/user.types";
import type { IClass } from "../school/school-core.types";

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
export type PaginatedTeachers = PaginatedResponse<ITeacher>;
export type PaginatedClasses = PaginatedResponse<IClass>;





