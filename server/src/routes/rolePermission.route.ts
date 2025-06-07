// src/routes/rolePermission.route.ts
import { Router } from "express";
import { RolePermissionController } from "../controllers";
import { validate } from "../middlewares/validate";
import { createRolePermissionSchema, updateRolePermissionSchema } from "../validation/rolePermission";

const rolePermissionRouter = Router();
const rolePermissionController = new RolePermissionController();

rolePermissionRouter.post("/", validate(createRolePermissionSchema), rolePermissionController.createRolePermission);
rolePermissionRouter.get("/", rolePermissionController.getAllRolePermissions);
rolePermissionRouter.get("/:id", rolePermissionController.getRolePermissionById);
rolePermissionRouter.put("/:id",validate(updateRolePermissionSchema),rolePermissionController.updateRolePermission);
rolePermissionRouter.delete("/:id", rolePermissionController.deleteRolePermission);

rolePermissionRouter.get("/role/:roleId", rolePermissionController.getRolePermissionsByRoleId);
rolePermissionRouter.get("/permission/:permissionId", rolePermissionController.getRolePermissionsByPermissionId);
rolePermissionRouter.get("/school/:schoolId", rolePermissionController.getRolePermissionsBySchool);

export { rolePermissionRouter };
