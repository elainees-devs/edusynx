// server/src/models/academics/class.teacher.model.ts
import { Schema, Types, model } from "mongoose";
import { IClassTeacher } from "../../types";

const classTeacherSchema = new Schema<IClassTeacher>(
  {
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    teacher: { type: Schema.Types.ObjectId, ref: "User", required: true },
    grade: { type: Types.ObjectId, ref: "Class", required: true },
    stream: { type: Types.ObjectId, ref: "Stream", required: true },
    totalStudents: { type: Number, default: 0 },
  },
  { timestamps: true } 
);

export const ClassTeacherModel = model<IClassTeacher>("ClassTeacher", classTeacherSchema);

