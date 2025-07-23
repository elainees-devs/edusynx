// server/types/school/allocation.types.ts
import { Types } from "mongoose";
import { ISchool } from "./school-core.types";
import { BaseDocument } from "../common/base.types";

export interface SubjectAllocation {
  subjectName: string;
  teachers: (string | Types.ObjectId)[];           
  headOfSubject?: string | Types.ObjectId;        
}

export interface ClassAllocation {
  className: string;
  classTeacher?: string | Types.ObjectId;         
  subjects: SubjectAllocation[];
}

export interface ISchoolAllocation extends BaseDocument {
  school: Types.ObjectId | ISchool | string;       // <-- allow string for incoming payload
  classes: ClassAllocation[];
  headsOfSubjects: Record<string, string | Types.ObjectId>;
}
