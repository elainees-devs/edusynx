// src/routes/invoice.route.ts
import { Router } from "express";
import { InvoiceController } from "../controllers/invoice.controller";

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.post("/", invoiceController.createInvoice);
invoiceRouter.get("/", invoiceController.getAllInvoices);
invoiceRouter.get("/:id", invoiceController.getInvoiceById);
invoiceRouter.put("/:id", invoiceController.updateInvoice);
invoiceRouter.delete("/:id", invoiceController.deleteInvoice);
invoiceRouter.delete("/", invoiceController.deleteAllInvoices);

export default invoiceRouter;
