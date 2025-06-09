// src/models/role.model.ts
import { Schema, model,} from "mongoose";
import { IRole } from "../types/security/role.types";
import { UserRole } from "../types/enum/enum";

export const RoleSchemaFields: Record<
  keyof Omit<IRole, "_id" | "createdAt" | "updatedAt">,
  any
> = {
  role: { type: String, enum: Object.values(UserRole), required: true },
  permissions: [{ type: String, required: true }],
  createdBy: { type: String, required: true }, 
  updatedBy: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  school: { type: Schema.Types.ObjectId, ref: "School", required: true },
  isSystemRole: { type: Boolean, default: false },
  customAttributes: { type: Schema.Types.Mixed, default: {} },
};

export const RoleSchema = new Schema<IRole>(
  RoleSchemaFields,
  { timestamps: true }
);

export const Role = model<IRole>("Role", RoleSchema);