// server/src/routes/school.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  createSchoolSchema,
  updateSchoolSchema,
} from "../validation/school.schema";
import { SchoolController } from "../controllers";
import { validateObjectId } from "../middlewares/validateObjectId";

const schoolRouter = Router();
const schoolController = new SchoolController();

/**
 * @swagger
 * tags:
 *   name: Schools
 *   description: Manage school creation, updates, and activation
 */

/**
 * @swagger
 * /api/schools/register:
 *   post:
 *     summary: Register a new school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolCreate'
 *     responses:
 *       201:
 *         description: School registered successfully
 *       400:
 *         description: Validation error
 */
schoolRouter.post(
  "/register",
  validate(createSchoolSchema),
  schoolController.createSchool
);

/**
 * @swagger
 * /api/schools:
 *   get:
 *     summary: Get all registered schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: List of all schools
 */
schoolRouter.get("/", schoolController.getAllSchools);

/**
 * @swagger
 * /api/schools/{id}/activate:
 *   patch:
 *     summary: Activate a school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School ID
 *     responses:
 *       200:
 *         description: School activated
 *       404:
 *         description: School not found
 */
schoolRouter.patch(":id/activate", schoolController.activateSchool);

/**
 * @swagger
 * /api/schools/{id}:
 *   put:
 *     summary: Update a school's details
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolUpdate'
 *     responses:
 *       200:
 *         description: School updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: School not found
 */
schoolRouter.put(
  "/:id",
  validate(updateSchoolSchema),
  schoolController.updateSchool
);

/**
 * @swagger
 * /api/schools/{id}:
 *   delete:
 *     summary: Delete a school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: School ID
 *     responses:
 *       204:
 *         description: School deleted
 *       404:
 *         description: School not found
 */
schoolRouter.delete("/:id", schoolController.deleteSchoolById);

/**
 * @swagger
 * /api/schools:
 *   delete:
 *     summary: Delete all schools
 *     tags: [Schools]
 *     responses:
 *       204:
 *         description: All schools deleted
 */
schoolRouter.delete("/", schoolController.deleteAllSchools);

/**
 * @swagger
 * /api/schools/{id}:
 *   get:
 *     summary: Get a school by ID
 *     tags: [Schools]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: School ID
 *     responses:
 *       200:
 *         description: School details
 *       404:
 *         description: School not found
 */
schoolRouter.get("/:id", validateObjectId("id"), schoolController.getSchoolById);

export { schoolRouter };
