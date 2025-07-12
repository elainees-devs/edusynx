// server/src/models/super-admin.model.ts
import { Schema, model } from "mongoose";
import { ISuperAdmin } from "../types";


const SuperAdminSchema = new Schema<ISuperAdmin>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ["super-admin"] },
  },
  { timestamps: true }
);

export const SuperAdminModel = model<ISuperAdmin>("SuperAdmin", SuperAdminSchema);
