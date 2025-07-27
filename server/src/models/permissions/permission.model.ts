// server/src/models/permissions/permission.model.ts
import mongoose, { Schema, Types } from "mongoose";
import { UserRole } from "../../types/enum/enum";
import { IPermission } from "../../types";

// Permission Schema
const PermissionSchema = new Schema<IPermission>(
  {
    permissionName: {
      type: String,
      required: true,
      trim: true,
    },
    permissionDescription: {
      type: String,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    school: {
      type: Types.ObjectId,
      ref: "School",
      required: true,
    },
    roles: {
      type: [String],
      enum: Object.values(UserRole),
      default: [],
    },
  },
  { timestamps: true }
);

export const Permission = mongoose.model<IPermission>(
  "Permission",
  PermissionSchema
);
