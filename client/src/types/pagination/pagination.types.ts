import type { Student } from "../people/student.types";

export interface PaginatedStudents {
  data: Student[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
