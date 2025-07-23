// server/src/routes/allocation.route.ts
import { Router } from "express";
import { AllocationController } from "../controllers";

const allocationRouter = Router();
const allocationController = new AllocationController();

/**
 * @openapi
 * /api/allocations/:
 *   post:
 *     summary: Create allocation for a school
 *     tags:
 *       - Allocations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolAllocation'
 *     responses:
 *       201:
 *         description: Allocation created
 */
allocationRouter.post("/", allocationController.createAllocation);

/**
 * @openapi
 * /api/allocations/{schoolId}:
 *   get:
 *     summary: Get allocation by schoolId
 *     tags:
 *       - Allocations
 *     parameters:
 *       - name: schoolId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Allocation found
 */
allocationRouter.get("/:schoolId", allocationController.getAllocationBySchoolId);

/**
 * @openapi
 * /api/allocations/{schoolId}:
 *   put:
 *     summary: Update allocation by schoolId
 *     tags:
 *       - Allocations
 *     parameters:
 *       - name: schoolId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SchoolAllocation'
 *     responses:
 *       200:
 *         description: Updated allocation
 */
allocationRouter.put("/:schoolId", allocationController.updateAllocationBySchoolId);

/**
 * @openapi
 * /api/allocations/{schoolId}:
 *   delete:
 *     summary: Delete allocation by schoolId
 *     tags:
 *       - Allocations
 *     parameters:
 *       - name: schoolId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted
 */
allocationRouter.delete("/:schoolId", allocationController.deleteAllocationBySchoolId);

/**
 * @openapi
 * /api/allocations/:
 *   get:
 *     summary: Get all allocations
 *     tags:
 *       - Allocations
 *     responses:
 *       200:
 *         description: List of allocations
 */
allocationRouter.get("/", allocationController.getAllAllocations);

export { allocationRouter };
