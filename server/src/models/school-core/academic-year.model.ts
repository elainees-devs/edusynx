import { Schema, model, Types } from "mongoose";
import { IAcademicYear } from "../../types";

const TermPeriodSchema = new Schema(
  {
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const AcademicYearSchema = new Schema<IAcademicYear>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isActive: { type: Boolean, default: false },
    terms: { type: [TermPeriodSchema], default: [] },
  },
  { timestamps: true }
);

AcademicYearSchema.index({ school: 1, name: 1 }, { unique: true });
AcademicYearSchema.index({ school: 1, isActive: 1 });

export const AcademicYearModel = model<IAcademicYear>("AcademicYear", AcademicYearSchema);
