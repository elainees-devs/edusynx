//src/models/teacherUser.model.ts
import mongoose, { Schema, Document, Types } from "mongoose";
import { ITeacherUser, UserRole } from "../types";

const TeacherUserSchema: Schema = new Schema({
  role: {
    type: String,
    enum: [UserRole.TEACHER],
    required: true,
    default: UserRole.TEACHER,
  },
  teacherId: {
    type: String,
  },
  isClassTeacher: {
    type: Boolean,
    default: false,
  },
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
  },
  teachingSubjects: {
    type: [String],
    default: [],
  },
});

export const TeacherUser = mongoose.model<ITeacherUser>(
  "TeacherUser",
  TeacherUserSchema
);
