// server/routes/guardian.route.ts

import { Router } from "express";
import { GuardianController } from "../controllers/people/guardian.controller";
import { updateGuardianSchema } from "../validation";
import { validate } from "../middlewares/validate";
import { authenticateUser } from "../middlewares/auth";
import { UserRole } from "../types";

const guardianRouter = Router();
const guardianController = new GuardianController();

/**
 * @swagger
 * tags:
 *   name: Guardians
 *   description: API endpoints for managing guardians
 */

/**
 * @swagger
 * /api/v1/guardians:
 *   post:
 *     summary: Generate or reuse family number and create a guardian
 *     tags: [Guardians]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               middleName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               secondaryEmail:
 *                 type: string
 *               primaryPhoneNumber:
 *                 type: string
 *               secondaryPhoneNumber:
 *                 type: string
 *               nationality:
 *                 type: string
 *               adm:
 *                 type: string
 *                 description: Admission number of the student to link guardian
 *               school:
 *                 type: string
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - primaryPhoneNumber
 *               - adm
 *               - school
 *     responses:
 *       201:
 *         description: Guardian created successfully
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
guardianRouter.post(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  guardianController.generateFamilyNumberAndcreateGuardian,
);

/**
 * @swagger
 * /api/v1/guardians:
 *   get:
 *     summary: Retrieve all guardians
 *     tags: [Guardians]
 *     responses:
 *       200:
 *         description: List of all guardians
 */
guardianRouter.get(
  "/",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  guardianController.getAllGuardians,
);

/**
 * @swagger
 * /api/v1/guardians/search:
 *   get:
 *     summary: Search guardians with text search
 *     tags: [Guardians]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Full-text search term
 *       - in: query
 *         name: schoolId
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated search results
 */
guardianRouter.get(
  "/search",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL, UserRole.TEACHER]),
  guardianController.searchGuardians,
);

/**
 * @swagger
 * /api/v1/guardians/{id}:
 *   patch:
 *     summary: Update guardian by ID
 *     tags: [Guardians]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Guardian ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateGuardian'
 *     responses:
 *       200:
 *         description: Guardian updated successfully
 *       404:
 *         description: Guardian not found
 *       400:
 *         description: Validation error
 * 
 */
guardianRouter.patch(
  "/:id",
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(updateGuardianSchema),
  guardianController.updateGuardianById,
);

export { guardianRouter };
