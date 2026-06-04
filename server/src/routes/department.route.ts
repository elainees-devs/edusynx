// server/src/routes/department.route.ts
import { Router } from "express";
import { DepartmentController } from "../controllers";
import { authenticateUser } from "../middlewares/auth";
import { createDepartmentSchema, updateDepartmentSchema } from "../validation/department.schema";
import { validate } from "../middlewares/validate";
import { UserRole } from "../types/enum/enum";

const departmentRouter = Router();
const departmentController = new DepartmentController();

/**
 * @swagger
 * tags:
 *   name: Departments
 *   description: Department management
 */

/**
 * @swagger
 * /api/v1/departments:
 *   post:
 *     summary: Create a new department
 *     tags: [Departments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDepartmentDTO'
 *     responses:
 *       201:
 *         description: Department created successfully
 *       400:
 *         description: Validation error
 */
departmentRouter.post(
  '/',
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(createDepartmentSchema),
  departmentController.createDepartment
);

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Department found
 *       404:
 *         description: Department not found
 */
departmentRouter.get('/:id', authenticateUser(), departmentController.getDepartmentById);

/**
 * @swagger
 * /api/v1/departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: List of departments
 */
departmentRouter.get('/', authenticateUser(), departmentController.getAllDepartments);

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   put:
 *     summary: Update a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateDepartmentDTO'
 *     responses:
 *       200:
 *         description: Department updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Department not found
 */
departmentRouter.put(
  '/:id',
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  validate(updateDepartmentSchema),
  departmentController.updateDepartment
);

/**
 * @swagger
 * /api/v1/departments/{id}:
 *   delete:
 *     summary: Delete a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Department deleted
 *       404:
 *         description: Department not found
 */
departmentRouter.delete(
  '/:id',
  authenticateUser([UserRole.SCHOOL_ADMIN, UserRole.PRINCIPAL]),
  departmentController.deleteDepartment
);

/**
 * @swagger
 * /api/v1/departments:
 *   delete:
 *     summary: Delete all departments
 *     tags: [Departments]
 *     responses:
 *       204:
 *         description: All departments deleted
 */
departmentRouter.delete(
  '/',
  authenticateUser([UserRole.SUPER_ADMIN]),
  departmentController.deleteAllDepartments
);

export {departmentRouter};
