// client/src/types/school/allocation.ts
export interface SubjectAllocation {
  subjectName: string;
  teachers: string[]; // teachers assigned to this subject
  headOfSubject?: string; // optional
}

export interface ClassAllocation {
  className: string;
  classTeacher?: string; // main teacher for the class
  subjects: SubjectAllocation[];
  // RULE: classTeacher (if set) must appear in at least one of the subjects.teachers
}

export interface SchoolAllocation {
  classes: ClassAllocation[];
  headsOfSubjects: Record<string, string>;
}
