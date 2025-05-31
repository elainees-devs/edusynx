//src/models/rolePermission.model.ts
import { Schema, model } from "mongoose";
import { IRolePermission } from "../types/security/permission.types";

const RolePermissionSchema = new Schema<IRolePermission>(
  {
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    permissionId: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
  },
  { timestamps: true }
);

export const RolePermissionModel = model<IRolePermission>(
  "RolePermission",
  RolePermissionSchema
);
