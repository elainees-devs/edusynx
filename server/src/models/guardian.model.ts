// src/models/guardian.model.ts
import mongoose, { Schema } from "mongoose";
import { IGuardian, UserRole } from "../types";
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

export const GuardianModel = mongoose.model<IGuardian>(
  "GuardianUser",
  GuardianSchema
);
