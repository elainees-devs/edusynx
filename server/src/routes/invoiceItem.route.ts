// src/routes/invoiceItem.routes.ts
import { Router } from "express";
import { InvoiceItemController } from "../controllers/invoiceItem.controller";
import { validate } from "../middlewares/validate";
import { createInvoiceItemSchema, updateInvoiceItemSchema } from "../validation/invoiceItem.schema";

const invoiceItemRouter = Router();
const controller = new InvoiceItemController();

invoiceItemRouter.post("/",validate(createInvoiceItemSchema),controller.createInvoiceItem);
invoiceItemRouter.get("/:id", controller.getInvoiceItemById);
invoiceItemRouter.get("/", controller.getAllInvoiceItems);
invoiceItemRouter.put("/:id",validate(updateInvoiceItemSchema),controller.updateInvoiceItem);
invoiceItemRouter.delete("/:id", controller.deleteInvoiceItem);
invoiceItemRouter.delete("/", controller.deleteAllInvoiceItems);

export {invoiceItemRouter};
