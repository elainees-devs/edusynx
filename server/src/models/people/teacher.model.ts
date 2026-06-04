// server/src/models/people/teacher.model.ts
// TeacherModel now points to the unified "staff" collection.
// Kept for backward compatibility with models that ref "Teacher".
import mongoose, { Schema } from "mongoose";
import { ITeacher, UserRole } from "../../types";
import { UserSchemaFields } from "./user.model";

const teacherSchema = new Schema<ITeacher>(
  {
     ...UserSchemaFields,

    role: {
      type: String,
      enum: [UserRole.TEACHER],
      default: UserRole.TEACHER,
    },

    teacherId: { type: String, required: true, unique: true },
    isClassTeacher: { type: Boolean, default: false },
    isHeadOfDepartment: { type: Boolean, default: false },
    department: { type: Schema.Types.ObjectId, ref: "Department" },
    assignedClass: { type: Schema.Types.ObjectId, ref: "Class" },
  },
  { timestamps: true, collection: "staff" }
);

export const TeacherModel = mongoose.model<ITeacher>("Teacher", teacherSchema);
