//src/models/teacherSubject.model.ts
import { Schema, Types, model } from "mongoose";
import { ITeacherSubject } from "../types/school/school-core.types";

const teacherSubjectSchema = new Schema<ITeacherSubject>(
  {
    school: { type: Types.ObjectId, ref: 'School', required: true },
    teacherId: { type: Types.ObjectId, ref: 'User', required: true },
    subjectId: { type: Types.ObjectId, ref: 'Subject', required: true },
  },
  {
    timestamps: true,
  }
);

export const TeacherSubjectModel = model<ITeacherSubject>('TeacherSubject', teacherSubjectSchema);