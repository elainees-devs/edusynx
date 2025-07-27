// server/src/routes/invoiceItem.routes.ts
import { Router } from "express";
import { InvoiceItemController } from "../controllers/finance/invoiceItem.controller";
import { validate } from "../middlewares/validate";
import { createInvoiceItemSchema, updateInvoiceItemSchema } from "../validation/invoiceItem.schema";

const invoiceItemRouter = Router();
const controller = new InvoiceItemController();

/**
 * @swagger
 * tags:
 *   name: InvoiceItems
 *   description: Endpoints for managing invoice items
 */

/**
 * @swagger
 * /api/invoice-items:
 *   post:
 *     summary: Create a new invoice item
 *     tags: [InvoiceItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceItemCreate'
 *     responses:
 *       201:
 *         description: Invoice item created
 *       400:
 *         description: Validation error
 */
invoiceItemRouter.post("/", validate(createInvoiceItemSchema), controller.createInvoiceItem);

/**
 * @swagger
 * /api/invoice-items/{id}:
 *   get:
 *     summary: Get an invoice item by ID
 *     tags: [InvoiceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice item ID
 *     responses:
 *       200:
 *         description: Invoice item details
 *       404:
 *         description: Item not found
 */
invoiceItemRouter.get("/:id", controller.getInvoiceItemById);

/**
 * @swagger
 * /api/invoice-items:
 *   get:
 *     summary: Get all invoice items
 *     tags: [InvoiceItems]
 *     responses:
 *       200:
 *         description: A list of invoice items
 */
invoiceItemRouter.get("/", controller.getAllInvoiceItems);

/**
 * @swagger
 * /api/invoice-items/{id}:
 *   put:
 *     summary: Update an invoice item by ID
 *     tags: [InvoiceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceItemUpdate'
 *     responses:
 *       200:
 *         description: Invoice item updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Item not found
 */
invoiceItemRouter.put("/:id", validate(updateInvoiceItemSchema), controller.updateInvoiceItem);

/**
 * @swagger
 * /api/invoice-items/{id}:
 *   delete:
 *     summary: Delete an invoice item by ID
 *     tags: [InvoiceItems]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item deleted
 */
invoiceItemRouter.delete("/:id", controller.deleteInvoiceItem);

/**
 * @swagger
 * /api/invoice-items:
 *   delete:
 *     summary: Delete all invoice items
 *     tags: [InvoiceItems]
 *     responses:
 *       204:
 *         description: All items deleted
 */
invoiceItemRouter.delete("/", controller.deleteAllInvoiceItems);

export { invoiceItemRouter };

