// server/src/models/teacher-subject.model.ts
import { Schema, Types, model } from "mongoose";
import { ITeacherSubject } from "../../types";

const TeacherSubjectSchema = new Schema<ITeacherSubject>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    teacherId: { type: Types.ObjectId, ref: "Teacher", required: true },
    subjectId: { type: Types.ObjectId, ref: "Subject", required: true },
    classId: { type: Types.ObjectId, ref: "Class", required: true },
    streamId: { type: Types.ObjectId, ref: "Stream", required: true },
  },
  {
    timestamps: true,
  }
);

// Indexes
TeacherSubjectSchema.index({ teacherId: 1 });
TeacherSubjectSchema.index({ subjectId: 1 });
TeacherSubjectSchema.index({ classId: 1 });
TeacherSubjectSchema.index({ streamId: 1 });
TeacherSubjectSchema.index({ school: 1 });

// To prevent duplicate assignments
TeacherSubjectSchema.index(
  { teacherId: 1, subjectId: 1, classId: 1, streamId: 1, school: 1 },
  { unique: true }
);

export const TeacherSubjectModel = model<ITeacherSubject>(
  "TeacherSubject",
  TeacherSubjectSchema
);
