// server/src/routes/super-admin.route.ts
import { Router } from "express";
import { SuperAdminController } from "../controllers/super-admin.controller";

const adminRouter = Router();
const superAdminController = new SuperAdminController();

/**
 * @swagger
 * tags:
 *   name: SuperAdmin
 *   description: Super Admin management
 */

/**
 * @swagger
 * /api/v1/super-admin/login:
 *   post:
 *     summary: Super admin login
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
adminRouter.post("/login", superAdminController.login);

/**
 * @swagger
 * /api/v1/super-admin/signup:
 *   post:
 *     summary: Create the only super admin
 *     tags: [SuperAdmin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Super admin created
 *       400:
 *         description: Super admin already exists
 */
adminRouter.post("/signup", superAdminController.createSuperAdmin);

/**
 * @swagger
 * /api/v1/super-admin:
 *   get:
 *     summary: Get all super admins
 *     tags: [SuperAdmin]
 *     responses:
 *       200:
 *         description: List of super admins
 */
adminRouter.get("/", superAdminController.getAll);

export default adminRouter;
