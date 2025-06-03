//src/models/teacher.model.ts
import mongoose, { Schema} from "mongoose";
import { ITeacherUser, UserRole } from "../types";
import { UserSchemaFields } from "./user.model";

const TeacherSchema: Schema = new Schema({
  ...UserSchemaFields,
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

export const Teacher = mongoose.model<ITeacherUser>(
  "TeacherUser",
  TeacherSchema
);
