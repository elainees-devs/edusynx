// server/src/routes/department.route.ts
import { Router } from "express";
import { DepartmentController } from "../controllers";
import { createDepartmentSchema, updateDepartmentSchema } from "../validation/department.schema";
import { validate } from "../middlewares/validate";

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
 * /departments:
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
departmentRouter.post('/', validate(createDepartmentSchema), departmentController.createDepartment);

/**
 * @swagger
 * /departments/{id}:
 *   get:
 *     summary: Get a department by ID
 *     tags: [Departments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Department found
 *       404:
 *         description: Department not found
 */
departmentRouter.get('/:id', departmentController.getDepartmentById);

/**
 * @swagger
 * /departments:
 *   get:
 *     summary: Get all departments
 *     tags: [Departments]
 *     responses:
 *       200:
 *         description: List of departments
 */
departmentRouter.get('/', departmentController.getAllDepartments);

/**
 * @swagger
 * /departments/{id}:
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
departmentRouter.put('/:id', validate(updateDepartmentSchema), departmentController.updateDepartment);

/**
 * @swagger
 * /departments/{id}:
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
departmentRouter.delete('/:id', departmentController.deleteDepartment); // Fixed typo in ':id'

/**
 * @swagger
 * /departments:
 *   delete:
 *     summary: Delete all departments
 *     tags: [Departments]
 *     responses:
 *       204:
 *         description: All departments deleted
 */
departmentRouter.delete('/', departmentController.deleteAllDepartments);

export {departmentRouter};
