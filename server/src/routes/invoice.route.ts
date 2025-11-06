// server/src/routes/invoice.route.ts
import { Router } from "express";
import { InvoiceController } from "../controllers/finance/invoice.controller";
import { validate } from "../middlewares/validate";
import { createInvoiceSchema, updateInvoiceSchema } from "../validation/invoice.schema";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management endpoints
 */

/**
 * @swagger
 * /api/v1/invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceCreate'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *       400:
 *         description: Validation error
 */
invoiceRouter.post("/", validate(createInvoiceSchema), invoiceController.createInvoice);

/**
 * @swagger
 * /api/v1/invoices:
 *   get:
 *     summary: Get all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: A list of invoices
 */
invoiceRouter.get("/", invoiceController.getAllInvoices);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   get:
 *     summary: Get a specific invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice found
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.get("/:id", invoiceController.getInvoiceById);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   put:
 *     summary: Update an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceUpdate'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Invoice not found
 */
invoiceRouter.put("/:id", validate(updateInvoiceSchema), invoiceController.updateInvoice);

/**
 * @swagger
 * /api/v1/invoices/{id}:
 *   delete:
 *     summary: Delete an invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       204:
 *         description: Invoice deleted successfully
 */
invoiceRouter.delete("/:id", invoiceController.deleteInvoice);

/**
 * @swagger
 * /api/v1/invoices:
 *   delete:
 *     summary: Delete all invoices
 *     tags: [Invoices]
 *     responses:
 *       204:
 *         description: All invoices deleted
 */
invoiceRouter.delete("/", invoiceController.deleteAllInvoices);

export { invoiceRouter };

