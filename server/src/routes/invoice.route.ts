// src/routes/invoice.route.ts
import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";
import { validate } from "../middlewares/validate";
import { createInvoiceSchema, updateInvoiceSchema } from "../validation/invoice.schema";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.post("/",validate(createInvoiceSchema), invoiceController.createInvoice);
invoiceRouter.get("/", invoiceController.getAllInvoices);
invoiceRouter.get("/:id", invoiceController.getInvoiceById);
invoiceRouter.put("/:id",validate(updateInvoiceSchema),invoiceController.updateInvoice);
invoiceRouter.delete("/:id", invoiceController.deleteInvoice);
invoiceRouter.delete("/", invoiceController.deleteAllInvoices);

export {invoiceRouter};
