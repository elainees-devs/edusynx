// server/src/routes/feePayment.route.ts
import { Router } from "express";
import { FeePaymentController } from "../controllers/feePayment.controller";

const feePaymentRouter = Router();
const feePaymentController = new FeePaymentController();

/**
 * @swagger
 * tags:
 *   name: FeePayments
 *   description: Fee payment summary and tracking endpoints
 */

/**
 * @swagger
 * /api/fee-payments:
 *   post:
 *     summary: Create a new fee payment summary
 *     tags: [FeePayments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeePaymentCreate'
 *     responses:
 *       201:
 *         description: Fee payment summary created
 */
feePaymentRouter.post("/", feePaymentController.createFeePaymentSummary);

/**
 * @swagger
 * /api/fee-payments:
 *   get:
 *     summary: Get all fee payment summaries
 *     tags: [FeePayments]
 *     responses:
 *       200:
 *         description: A list of all fee payment summaries
 */
feePaymentRouter.get("/", feePaymentController.getAllFeePaymentSummaries);

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   get:
 *     summary: Get a fee payment summary by ID
 *     tags: [FeePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Fee payment summary ID
 *     responses:
 *       200:
 *         description: Fee payment summary found
 *       404:
 *         description: Summary not found
 */
feePaymentRouter.get("/:id", feePaymentController.getFeePaymentSummaryById);

/**
 * @swagger
 * /api/fee-payments/student/{studentId}:
 *   get:
 *     summary: Get all fee payment summaries for a student
 *     tags: [FeePayments]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of summaries for the student
 */
feePaymentRouter.get("/student/:studentId", feePaymentController.getFeePaymentSummariesByStudent);

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   put:
 *     summary: Update a fee payment summary by ID
 *     tags: [FeePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Summary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeePaymentUpdate'
 *     responses:
 *       200:
 *         description: Fee payment summary updated
 */
feePaymentRouter.put("/:id", feePaymentController.updateFeePaymentSummary);

/**
 * @swagger
 * /api/fee-payments/{id}:
 *   delete:
 *     summary: Delete a fee payment summary by ID
 *     tags: [FeePayments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Summary deleted
 */
feePaymentRouter.delete("/:id", feePaymentController.deleteFeePaymentSummary);

/**
 * @swagger
 * /api/fee-payments/totals/student/{studentId}:
 *   get:
 *     summary: Calculate total fees paid by a specific student
 *     tags: [FeePayments]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Total fees paid by student
 */
feePaymentRouter.get("/totals/student/:studentId", feePaymentController.calculateTotalFeesPaidByStudent);

/**
 * @swagger
 * /api/fee-payments/totals:
 *   get:
 *     summary: Calculate total fees paid by all students
 *     tags: [FeePayments]
 *     responses:
 *       200:
 *         description: Total fees paid by all students
 */
feePaymentRouter.get("/totals", feePaymentController.calculateTotalFeesPaidByAllStudents);

/**
 * @swagger
 * /api/fee-payments/add-payment:
 *   post:
 *     summary: Add a payment to a fee payment summary
 *     tags: [FeePayments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeePaymentAdd'
 *     responses:
 *       200:
 *         description: Payment added successfully
 */
feePaymentRouter.post("/add-payment", feePaymentController.addPaymentToSummary);

export {feePaymentRouter};
