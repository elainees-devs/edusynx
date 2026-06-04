import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISchool } from "../school/school-core.types";
import { IStudent } from "../people/student.types";
import { IClass, IStream } from "../school/school-core.types";
import { IAcademicYear } from "../school/academic-year.types";
import { EnrollmentStatus, EnrollmentType } from "../enum/enum";

export interface IEnrollment extends BaseDocument {
  school: Types.ObjectId | ISchool;
  student: Types.ObjectId | IStudent;
  clas: Types.ObjectId | IClass;
  stream: Types.ObjectId | IStream;
  academicYear: Types.ObjectId | IAcademicYear;
  enrollmentDate: Date;
  status: EnrollmentStatus;
  enrollmentType: EnrollmentType;
  remarks?: string;
}
