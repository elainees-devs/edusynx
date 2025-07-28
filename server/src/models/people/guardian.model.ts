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
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes
GuardianSchema.index({ email: 1 }, { unique: true }); // Assuming email is in UserSchemaFields
GuardianSchema.index({ phoneNumber: 1 });             // For quick lookup by phone
GuardianSchema.index({ familyNumber: 1 });            // For grouping family-related students/guardians
GuardianSchema.index({ role: 1 });   

export const GuardianModel = mongoose.model<IGuardian>(
  "GuardianUser",
  GuardianSchema
);
