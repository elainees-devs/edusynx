//server/src/models/school-core/class.model.ts
import { Schema, model, Types } from "mongoose";
import { IClass } from "../../types";

const ClassSchema = new Schema<IClass>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    grade: { type: String, required: true },
   stream: { type: Schema.Types.ObjectId, ref: "Stream"},
    academicYear: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Single-field index for efficient filtering by school
ClassSchema.index({ school: 1 });

//Compound index for optimized filtering by school + className + stream + academicYear
ClassSchema.index({ school: 1, className: 1, stream: 1, academicYear: 1 });

export const ClassModel = model<IClass>("Class", ClassSchema);
