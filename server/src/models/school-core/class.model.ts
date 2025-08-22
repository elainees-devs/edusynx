//server/src/models/school-core/class.model.ts
import { Schema, model, Types } from "mongoose";
import { IClass } from "../../types";

const ClassSchema = new Schema<IClass>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    grade: { type: String, required: true },
    stream: { type: Schema.Types.ObjectId, ref: "Stream" },
    academicYear: { type: String, required: true },
    classTeacher: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  {
    timestamps: true,
  }
);

//Compound index for optimized filtering by school + className + stream + academicYear
ClassSchema.index({ className: 1 });

export const ClassModel = model<IClass>("Class", ClassSchema);
