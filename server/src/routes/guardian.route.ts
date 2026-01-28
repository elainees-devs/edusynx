// server/routes/guardian.route.ts

import { Router } from "express";
import { GuardianController } from "../controllers/people/guardian.controller";
import { updateGuardianSchema } from "../validation";
import { validate } from "../middlewares/validate";

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
guardianRouter.post("/", guardianController.generateFamilyNumberAndcreateGuardian);

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
guardianRouter.get("/", guardianController.getAllGuardians);
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
  validate(updateGuardianSchema),
  guardianController.updateGuardianById
);

export { guardianRouter };
