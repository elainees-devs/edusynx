//src/models/user.model.ts
import { Schema, model, Types } from "mongoose";
import { IBaseUser } from "../types/people/user.types";
import { UserRole } from "../types/enum/enum";

const userSchema = new Schema<IBaseUser>(
  {
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    primaryEmail: { type: String, required: true, unique: true },
    secondaryEmail: { type: String },
    primaryPhoneNumber: { type: String, required: true },
    secondaryPhoneNumber: { type: String },
    hashedPassword: { type: String, required: true },
    nationality: { type: String, required: true },
    avatarUrl: { type: String },
    isActive: { type: Boolean, required: true, default: true },
    lastLogin: { type: Date },
    isLocked: { type: Boolean, required: true, default: false },
    passwordChangedAt: { type: Date },
    isTwoFactorEnabled: { type: Boolean, required: true, default: false },
    role: { type: String, enum: Object.values(UserRole), required: true },
  },
  {
    timestamps: true,
  }
);

export const User = model<IBaseUser>("User", userSchema);
