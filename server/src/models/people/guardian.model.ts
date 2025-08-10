// server/src/models/people/guardian.model.ts
import mongoose, { Schema } from "mongoose";
import { IGuardian, UserRole } from "../../types";
import { UserSchemaFields } from "./user.model";

const GuardianSchema: Schema = new Schema({
  ...UserSchemaFields,
  role: {
    type: String,
    enum: [UserRole.GUARDIAN],
    required: true,
    default: UserRole.GUARDIAN,
  },
  familyNumber: {
    type: Number,
  },
}, {
  timestamps: true,
});

// Indexes
GuardianSchema.index({ familyNumber: 1 });            // For grouping family-related students/guardians

export const GuardianModel = mongoose.model<IGuardian>(
  "GuardianUser",
  GuardianSchema
);
