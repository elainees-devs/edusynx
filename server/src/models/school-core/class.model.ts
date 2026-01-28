//server/src/models/school-core/class.model.ts
import mongoose, { Schema, model, Types } from "mongoose";
import { IClass } from "../../types";

const ClassSchema = new Schema<IClass>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    clasName: { type: String, required: true },
    academicYear: { type: String, required: true },
    classTeacher: { type: Schema.Types.ObjectId, ref: "User" },
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }],
  },
  { timestamps: true }
);

// Compound index for optimized filtering by grade + stream + academicYear
ClassSchema.index({ clasName: 1, academicYear: 1 });

export const ClassModel = model<IClass>("Class", ClassSchema);
