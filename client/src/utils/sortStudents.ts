// client/src/utils/sortStudents.ts
import type { Student } from "../types";

// Sort by admission number (lowest → highest)
export const sortByAdmissionNumber = (students: Student[]) => {
  return [...students].sort((a, b) => {
    const admA = Number(a.adm);
    const admB = Number(b.adm);

    if (isNaN(admA)) return 1;
    if (isNaN(admB)) return -1;

    return admA - admB;
  });
};

// Sort by first name (A → Z)
export const sortByFirstName = (students: Student[]) => {
  return [...students].sort((a, b) => {
    const firstA = a.studentFirstName?.toLowerCase() ?? "";
    const firstB = b.studentFirstName?.toLowerCase() ?? "";

    return firstA.localeCompare(firstB);
  });
};