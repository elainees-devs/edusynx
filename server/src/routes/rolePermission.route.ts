// server/src/routes/rolePermission.route.ts
import { Router } from "express";
import { RolePermissionController } from "../controllers";
import { validate } from "../middlewares/validate";
import { createRolePermissionSchema, updateRolePermissionSchema } from "../validation/rolePermission";

const rolePermissionRouter = Router();
const rolePermissionController = new RolePermissionController();

/**
 * @swagger
 * tags:
 *   name: RolePermissions
 *   description: Manage role-permission assignments
 */

/**
 * @swagger
 * /api/role-permissions:
 *   post:
 *     summary: Assign a permission to a role
 *     tags: [RolePermissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermissionCreate'
 *     responses:
 *       201:
 *         description: Role-permission assigned
 *       400:
 *         description: Validation error
 */
rolePermissionRouter.post("/", validate(createRolePermissionSchema), rolePermissionController.createRolePermission);

/**
 * @swagger
 * /api/role-permissions:
 *   get:
 *     summary: Get all role-permission assignments
 *     tags: [RolePermissions]
 *     responses:
 *       200:
 *         description: List of role-permission mappings
 */
rolePermissionRouter.get("/", rolePermissionController.getAllRolePermissions);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   get:
 *     summary: Get role-permission mapping by ID
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: RolePermission ID
 *     responses:
 *       200:
 *         description: Mapping found
 *       404:
 *         description: Mapping not found
 */
rolePermissionRouter.get("/:id", rolePermissionController.getRolePermissionById);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   put:
 *     summary: Update a role-permission mapping
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: RolePermission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RolePermissionUpdate'
 *     responses:
 *       200:
 *         description: Mapping updated
 *       404:
 *         description: Mapping not found
 */
rolePermissionRouter.put("/:id", validate(updateRolePermissionSchema), rolePermissionController.updateRolePermission);

/**
 * @swagger
 * /api/role-permissions/{id}:
 *   delete:
 *     summary: Delete a role-permission mapping
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: RolePermission ID
 *     responses:
 *       204:
 *         description: Mapping deleted
 */
rolePermissionRouter.delete("/:id", rolePermissionController.deleteRolePermission);

/**
 * @swagger
 * /api/role-permissions/role/{roleId}:
 *   get:
 *     summary: Get permissions for a specific role
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Role ID
 *     responses:
 *       200:
 *         description: List of permissions for the role
 */
rolePermissionRouter.get("/role/:roleId", rolePermissionController.getRolePermissionsByRoleId);

/**
 * @swagger
 * /api/role-permissions/permission/{permissionId}:
 *   get:
 *     summary: Get roles assigned to a specific permission
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: List of roles for the permission
 */
rolePermissionRouter.get("/permission/:permissionId", rolePermissionController.getRolePermissionsByPermissionId);

/**
 * @swagger
 * /api/role-permissions/school/{schoolId}:
 *   get:
 *     summary: Get all role-permission mappings for a school
 *     tags: [RolePermissions]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: School ID
 *     responses:
 *       200:
 *         description: List of role-permission mappings in the school
 */
rolePermissionRouter.get("/school/:schoolId", rolePermissionController.getRolePermissionsBySchool);

export { rolePermissionRouter };

