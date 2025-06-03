//src/models/guardian.model.ts
import mongoose, { Schema} from "mongoose";
import { IGuardianUser, UserRole } from "../types";

const GuardianSchema: Schema = new Schema({
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

export const Guardian= mongoose.model<IGuardianUser>(
  "GuardianUser",
  GuardianSchema
);
