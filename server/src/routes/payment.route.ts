// server/src/routes/payment.route.ts
import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller";

const paymentRouter = Router();
const paymentController = new PaymentController();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Endpoints for managing payments
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentCreate'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Validation error
 */
paymentRouter.post("/", paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of all payments
 */
paymentRouter.get("/", paymentController.getAllPayments);

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
paymentRouter.get("/:id", paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentUpdate'
 *     responses:
 *       200:
 *         description: Payment updated
 *       404:
 *         description: Payment not found
 */
paymentRouter.put("/:id", paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete a payment by ID
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Payment ID
 *     responses:
 *       204:
 *         description: Payment deleted
 *       404:
 *         description: Payment not found
 */
paymentRouter.delete("/:id", paymentController.deletePayment);

/**
 * @swagger
 * /api/payments/student/{studentId}:
 *   get:
 *     summary: Get all payments by a specific student
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Payments for the student
 */
paymentRouter.get("/student/:studentId", paymentController.getPaymentsByStudent);

/**
 * @swagger
 * /api/payments/invoice/{invoiceId}:
 *   get:
 *     summary: Get all payments for a specific invoice
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: invoiceId
 *         schema:
 *           type: string
 *         required: true
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Payments for the invoice
 */
paymentRouter.get("/invoice/:invoiceId", paymentController.getPaymentsByInvoice);

export { paymentRouter };

