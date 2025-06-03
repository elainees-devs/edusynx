// src/validation/permission.schema.ts
import { z } from "zod";
import { UserRole } from "../types/enum/enum";
import { objectId } from "./util";

export const createPermissionSchema = z.object({
  permissionName: z.string().trim().min(1, "Permission name is required"),
  permissionDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  school: objectId,
  roles: z.array(z.nativeEnum(UserRole)).optional(),
});

export const updatePermissionSchema = createPermissionSchema.partial();
