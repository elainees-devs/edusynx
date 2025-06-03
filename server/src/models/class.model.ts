//src/models/class.model.ts
import { Schema, model, Types } from "mongoose";
import { IClass } from "../types/school/school-core.types";

const ClassSchema = new Schema<IClass>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    className: { type: String, required: true },
    stream: { type: String, required: true },
    academicYear: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const ClassModel = model<IClass>("Class", ClassSchema);
