// src/validation/rolePermission.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createRolePermissionSchema = z.object({
  school: objectId,
  roleId: objectId,
  permissionId: objectId,
});

export const updateRolePermissionSchema = createRolePermissionSchema.partial();
