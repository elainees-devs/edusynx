import { Schema, model, Types } from "mongoose";
import { IStaff, UserRole } from "../../types";
import { CounterModel } from "../counter.model";

const staffSchema = new Schema<IStaff>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    secondaryEmail: { type: String },
    primaryPhoneNumber: { type: String, required: true },
    secondaryPhoneNumber: { type: String },
    password: { type: String },
    nationality: { type: String, required: true },
    avatarUrl: { type: String },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    isLocked: { type: Boolean, default: false },
    passwordChangedAt: { type: Date },
    isTwoFactorEnabled: { type: Boolean, default: false },
    role: {
      type: String,
      enum: [
        UserRole.PRINCIPAL,
        UserRole.DEPUTY_PRINCIPAL,
        UserRole.TEACHER,
        UserRole.ACCOUNTANT,
        UserRole.SCHOOL_ADMIN,
      ],
      required: true,
    },
    employeeNumber: { type: String, unique: true, sparse: true },
    department: { type: Types.ObjectId, ref: "Department" },
    position: { type: String },
    isHeadOfDepartment: { type: Boolean, default: false },
    isClassTeacher: { type: Boolean, default: false },
    assignedClass: { type: Types.ObjectId, ref: "Class" },
    employmentDate: { type: Date },
  },
  { timestamps: true }
);

staffSchema.index({ school: 1, role: 1 });
staffSchema.index({ school: 1, department: 1 });
staffSchema.index({ employeeNumber: 1 });

staffSchema.pre("save", async function (next) {
  if (this.isNew && !this.employeeNumber) {
    try {
      const year = new Date().getFullYear();
      const schoolId = this.school.toString().slice(-4).toUpperCase();
      const counter = await CounterModel.findOneAndUpdate(
        { school: this.school },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );
      this.employeeNumber = `EMP-${year}-${schoolId}-${String(counter.seq).padStart(4, "0")}`;
    } catch (err: any) {
      return next(err);
    }
  }
  next();
});

export const StaffModel = model<IStaff>("Staff", staffSchema);
