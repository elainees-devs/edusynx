import { Schema, model, Types } from "mongoose";
import { IEnrollment } from "../../types";

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    student: { type: Types.ObjectId, ref: "Student", required: true },
    clas: { type: Types.ObjectId, ref: "Class", required: true },
    stream: { type: Types.ObjectId, ref: "Stream", required: true },
    academicYear: { type: Types.ObjectId, ref: "AcademicYear", required: true },
    enrollmentDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ["active", "transferred", "withdrawn", "graduated"],
      required: true,
    },
    enrollmentType: {
      type: String,
      enum: ["new", "re-enrollment", "promotion"],
      required: true,
    },
    remarks: { type: String },
  },
  { timestamps: true }
);

EnrollmentSchema.index({ school: 1, student: 1 });
EnrollmentSchema.index({ school: 1, clas: 1 });
EnrollmentSchema.index({ school: 1, academicYear: 1 });
EnrollmentSchema.index({ student: 1, academicYear: 1 }, { unique: true });

export const EnrollmentModel = model<IEnrollment>("Enrollment", EnrollmentSchema);
