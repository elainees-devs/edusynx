// server/src/routes/fee.route.ts
import { Router } from "express";
import { FeeController } from "../controllers/finance/fee.controller";
import { createFeeSchema, updateFeeSchema } from "../validation/fee.schema";
import { validate } from "../middlewares/validate";

const feeRouter = Router();
const feeController = new FeeController();

/**
 * @swagger
 * tags:
 *   name: Fees
 *   description: Fee management endpoints
 */

/**
 * @swagger
 * /api/v1/fees:
 *   post:
 *     summary: Create a new fee
 *     tags: [Fees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeCreate'
 *     responses:
 *       201:
 *         description: Fee created successfully
 *       400:
 *         description: Validation error
 */
feeRouter.post("/", validate(createFeeSchema), feeController.createFee);

/**
 * @swagger
 * /api/v1/fees/school/{schoolId}:
 *   get:
 *     summary: Get all fees for a specific school
 *     tags: [Fees]
 *     parameters:
 *       - in: path
 *         name: schoolId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the school
 *     responses:
 *       200:
 *         description: A list of fees
 */
feeRouter.get("/school/:schoolId", feeController.getFeesBySchool);

/**
 * @swagger
 * /api/v1/fees/{id}:
 *   get:
 *     summary: Get a fee by ID
 *     tags: [Fees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fee
 *     responses:
 *       200:
 *         description: Fee details
 *       404:
 *         description: Fee not found
 */
feeRouter.get("/:id", feeController.getFeeById);

/**
 * @swagger
 * /api/v1/fees/{id}:
 *   put:
 *     summary: Update a fee by ID
 *     tags: [Fees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fee to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeeUpdate'
 *     responses:
 *       200:
 *         description: Fee updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Fee not found
 */
feeRouter.put("/:id", validate(updateFeeSchema), feeController.updateFee);

/**
 * @swagger
 * /api/v1/fees/{id}:
 *   delete:
 *     summary: Delete a fee by ID
 *     tags: [Fees]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the fee to delete
 *     responses:
 *       204:
 *         description: Fee deleted successfully
 *       404:
 *         description: Fee not found
 */
feeRouter.delete("/:id", feeController.deleteFee);

export { feeRouter };
