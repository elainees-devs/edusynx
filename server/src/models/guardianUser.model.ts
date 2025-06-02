//src/models/guardianUser.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { IGuardianUser, UserRole } from "../types";

const GuardianUserSchema: Schema = new Schema({
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
});

export const GuardianUser = mongoose.model<IGuardianUser>(
  "GuardianUser",
  GuardianUserSchema
);
