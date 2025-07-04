// server/src/routes/permission.route.ts
import { Router } from "express";
import { PermissionController } from "../controllers/permission.controller";

const permissionRouter = Router();
const permissionController = new PermissionController();

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Manage role-based permissions for users and schools
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionCreate'
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Validation error
 */
permissionRouter.post("/", permissionController.createPermission);

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of all permissions
 */
permissionRouter.get("/", permissionController.getAllPermissions);

/**
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Permission ID
 *     responses:
 *       200:
 *         description: Permission found
 *       404:
 *         description: Permission not found
 */
permissionRouter.get("/:id", permissionController.getPermissionById);

/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Permission ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PermissionUpdate'
 *     responses:
 *       200:
 *         description: Permission updated
 *       404:
 *         description: Permission not found
 */
permissionRouter.put("/:id", permissionController.updatePermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Permission ID
 *     responses:
 *       204:
 *         description: Permission deleted
 *       404:
 *         description: Permission not found
 */
permissionRouter.delete("/:id", permissionController.deletePermission);

/**
 * @swagger
 * /api/permissions/role/{role}:
 *   get:
 *     summary: Get permissions assigned to a specific role
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: role
 *         schema:
 *           type: string
 *         required: true
 *         description: User role (e.g., teacher, accountant)
 *     responses:
 *       200:
 *         description: Permissions for the role
 *       404:
 *         description: No permissions found for the role
 */
permissionRouter.get("/role/:role", permissionController.getPermissionsByRole);

/**
 * @swagger
 * /api/permissions/school/{schoolId}:
 *   get:
 *     summary: Get permissions for a specific school
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         schema:
 *           type: string
 *         required: true
 *         description: School ID
 *     responses:
 *       200:
 *         description: Permissions for the school
 *       404:
 *         description: No permissions found for the school
 */
permissionRouter.get("/school/:schoolId", permissionController.getPermissionsBySchool);

export { permissionRouter };

