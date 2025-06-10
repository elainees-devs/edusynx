//src/models/user.model.ts
import { Schema, model } from "mongoose";
import { IBaseUser } from "../types/people/user.types";
import { UserRole } from "../types/enum/enum";

export const UserSchemaFields: Record<
  keyof Omit<IBaseUser, "_id" | "createdAt" | "updatedAt">,
  any
> = {
  school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: true },
  lastName: { type: String, required: true },
  primaryEmail: { type: String, required: true, unique: true },
  secondaryEmail: { type: String },
  primaryPhoneNumber: { type: String, required: true },
  secondaryPhoneNumber: { type: String },
  password: { type: String, required: true },
  nationality: { type: String, required: true },
  avatarUrl: { type: String },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  isLocked: { type: Boolean, default: false },
  passwordChangedAt: { type: Date },
  isTwoFactorEnabled: { type: Boolean, default: false },
  role: {
    type: String,
    enum: Object.values(UserRole),
    required: true,
  },
};

export const UserSchema = new Schema<IBaseUser>(UserSchemaFields, {
  timestamps: true,
});

export const UserModel = model<IBaseUser>("User", UserSchema);
