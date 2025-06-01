// src/validation/rolePermission.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const rolePermissionSchema = z.object({
  school: objectId,
  roleId: objectId,
  permissionId: objectId,
});
