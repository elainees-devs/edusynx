// server/src/routes/school.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { validateObjectId } from "../middlewares/validateObjectId";
import {
  createSchoolSchema,
  updateSchoolSchema,
} from "../validation/school.schema";
import { SchoolController } from "../controllers";

const schoolRouter = Router();
const schoolController = new SchoolController();

/**
 * @swagger
 * components:
 *   schemas:
 *     School:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the school
 *         name:
 *           type: string
 *           description: Name of the school
 *         slug:
 *           type: string
 *           description: URL-friendly version of the school name
 *         address:
 *           type: string
 *           description: School address
 *         isActive:
 *           type: boolean
 *           description: Status of the school
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 * 
 *   parameters:
 *     SchoolIdParam:
 *       in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: string
 *       description: The ID of the school
 *     SchoolSlugParam:
 *       in: path
 *       name: slug
 *       required: true
 *       schema:
 *         type: string
 *       description: The slug of the school
 *
 * tags:
 *   - name: Schools
 *     description: School management endpoints
 */

/* =========================
   CREATE
========================= */
/**
 * @swagger
 * /api/v1/schools/register:
 *   post:
 *     summary: Create a new school
 *     tags: [Schools]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       201:
 *         description: School created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       400:
 *         description: Validation error
 */
schoolRouter.post(
  "/register",
  validate(createSchoolSchema),
  schoolController.createSchool
);

/* =========================
   READ
========================= */
/**
 * @swagger
 * /api/v1/schools:
 *   get:
 *     summary: Get paginated list of schools
 *     tags: [Schools]
 *     parameters:
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
 *         description: List of schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 */
schoolRouter.get("/", schoolController.getPaginatedSchools);

/**
 * @swagger
 * /api/v1/schools/all:
 *   get:
 *     summary: Get all schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: List of all schools
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/School'
 */
schoolRouter.get("/all", schoolController.getAllSchools);

/**
 * @swagger
 * /api/v1/schools/{slug}:
 *   get:
 *     summary: Get school by slug
 *     tags: [Schools]
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolSlugParam'
 *     responses:
 *       200:
 *         description: School found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found
 */
schoolRouter.get("/:slug", schoolController.getSchoolBySlug);

/**
 * @swagger
 * /api/v1/schools/{id}:
 *   get:
 *     summary: Get school by ID
 *     tags: [Schools]
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     responses:
 *       200:
 *         description: School found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 *       404:
 *         description: School not found
 */
schoolRouter.get(
  "/:id",
  validateObjectId("id"),
  schoolController.getSchoolById
);

/* =========================
   UPDATE
========================= */
/**
 * @swagger
 * /api/v1/schools/{id}:
 *   put:
 *     summary: Update a school
 *     tags: [Schools]
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/School'
 *     responses:
 *       200:
 *         description: School updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/School'
 */
schoolRouter.put(
  "/:id",
  validateObjectId("id"),
  validate(updateSchoolSchema),
  schoolController.updateSchool
);

/**
 * @swagger
 * /api/v1/schools/{id}/activate:
 *   patch:
 *     summary: Activate a school
 *     tags: [Schools]
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     responses:
 *       200:
 *         description: School activated successfully
 */
schoolRouter.patch(
  "/:id/activate",
  validateObjectId("id"),
  schoolController.activateSchool
);

/* =========================
   DELETE
========================= */
/**
 * @swagger
 * /api/v1/schools/{id}:
 *   delete:
 *     summary: Delete a school by ID
 *     tags: [Schools]
 *     parameters:
 *       - $ref: '#/components/parameters/SchoolIdParam'
 *     responses:
 *       200:
 *         description: School deleted successfully
 */
schoolRouter.delete(
  "/:id",
  validateObjectId("id"),
  schoolController.deleteSchoolById
);

/**
 * @swagger
 * /api/v1/schools:
 *   delete:
 *     summary: Delete all schools
 *     tags: [Schools]
 *     responses:
 *       200:
 *         description: All schools deleted successfully
 */
schoolRouter.delete("/", schoolController.deleteAllSchools);

export { schoolRouter };
