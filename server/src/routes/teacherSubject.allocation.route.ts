import { Router } from "express";
import { TeacherSubjectAllocationController } from "../controllers/allocation/teacherSubject.allocation.controller";

const teacherSubjectAllocationController = new TeacherSubjectAllocationController();

export const teacherSubjectAllocationRouter = Router();


/**
 * @openapi
 * /teacher-subject-allocations:
 *   post:
 *     summary: Add a new teacher-subject allocation
 *     tags:
 *       - TeacherSubjectAllocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *               allocation:
 *                 $ref: '#/components/schemas/TeacherSubjectAllocation'
 *     responses:
 *       201:
 *         description: Allocation added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherSubjectAllocation'
 */
teacherSubjectAllocationRouter.post("/", teacherSubjectAllocationController.addAllocation);


/**
 * @openapi
 * /teacher-subject-allocations/{schoolId}:
 *   get:
 *     summary: Get all teacher-subject allocations for a school
 *     tags:
 *       - TeacherSubjectAllocation
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of allocations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TeacherSubjectAllocation'
 */
teacherSubjectAllocationRouter.get("/:schoolId", teacherSubjectAllocationController.getAllocationsBySchool);


/**
 * @openapi
 * /teacher-subject-allocations:
 *   put:
 *     summary: Update a specific teacher-subject allocation by index
 *     tags:
 *       - TeacherSubjectAllocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *               index:
 *                 type: integer
 *               update:
 *                 $ref: '#/components/schemas/TeacherSubjectAllocation'
 *     responses:
 *       200:
 *         description: Updated allocation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherSubjectAllocation'
 */
teacherSubjectAllocationRouter.put("/", teacherSubjectAllocationController.updateAllocationByIndex);


/**
 * @openapi
 * /teacher-subject-allocations:
 *   delete:
 *     summary: Remove a teacher-subject allocation by index
 *     tags:
 *       - TeacherSubjectAllocation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schoolId:
 *                 type: string
 *               index:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Removed allocation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TeacherSubjectAllocation'
 */
teacherSubjectAllocationRouter.delete("/", teacherSubjectAllocationController.removeAllocationByIndex);
