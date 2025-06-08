// src/routes/permission.route.ts
import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";

const permissionRouter = Router();
const permissionController = new PermissionController();

permissionRouter.post("/", permissionController.createPermission);
permissionRouter.get("/", permissionController.getAllPermissions);
permissionRouter.get("/:id", permissionController.getPermissionById);
permissionRouter.put("/:id", permissionController.updatePermission);
permissionRouter.delete("/:id", permissionController.deletePermission);
permissionRouter.get("/role/:role", permissionController.getPermissionsByRole);
permissionRouter.get("/school/:schoolId", permissionController.getPermissionsBySchool);

export {permissionRouter};
