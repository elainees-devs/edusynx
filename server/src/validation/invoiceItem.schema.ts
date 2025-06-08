// src/validation/invoiceItem.schema.ts
import { z } from "zod";
import { objectId } from "./util";

export const createInvoiceItemSchema = z.object({
  student: objectId,
  fee: objectId,
  amount: z.number().min(0, "Amount must be a positive number"),
  originalAmount: z.number().min(0).optional(),
  description: z.string().max(1000).optional(),
});

export const updateInvoiceItemSchema = createInvoiceItemSchema.partial();
