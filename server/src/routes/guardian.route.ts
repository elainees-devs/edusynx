// server/routes/guardian.route.ts

import { Router } from "express";
import { GuardianController } from "../controllers/people/guardian.controller";

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
 *               primaryPhoneNumber:
 *                 type: string
 *               adm:
 *                 type: string
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
 * /api/v1/guardians/list:
 *   get:
 *     summary: Retrieve all guardians
 *     tags: [Guardians]
 *     responses:
 *       200:
 *         description: List of guardians
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   primaryPhoneNumber:
 *                     type: string
 *       500:
 *         description: Server error
 */
guardianRouter.get("/list", guardianController.getAllGuardians);

export { guardianRouter };
