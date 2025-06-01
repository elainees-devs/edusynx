//src/validation/invoice.schema.ts
import { z } from "zod";
import { InvoiceStatus } from "../types/enum/enum";
import { objectId } from "./util";

// Invoice Item Schema (embedded)
const invoiceItemSchema = z.object({
  fee: objectId,
  amount: z.number().min(0, "Amount must be a positive number"),
});

// Full Invoice Schema
export const invoiceSchema = z
  .object({
    invoiceNumber: z.string().min(3).trim(),
    student: objectId,
    school: objectId,
    classId: objectId,
    items: z
      .array(invoiceItemSchema)
      .nonempty("Invoice must have at least one item"),
    totalAmount: z.number().min(0, "Total amount must be a positive number"),
    amountPaid: z.number().min(0, "Amount paid cannot be negative"),
    balance: z.number().min(0, "Balance cannot be negative"),
    issueDate: z.coerce.date(),
    dueDate: z.coerce.date(),
    status: z.enum([
      InvoiceStatus.ISSUED,
      InvoiceStatus.PAID,
      InvoiceStatus.UNPAID,
      InvoiceStatus.PARTIALLY_PAID,
      InvoiceStatus.OVERDUE,
      InvoiceStatus.CANCELLED,
      InvoiceStatus.REFUNDED,
    ]),
    notes: z.string().max(1000).optional(),
    termsAndConditions: z.string().max(2000).optional(),
    lateFee: z.number().min(0, "Late fee cannot be negative").optional(),
    createdBy: objectId.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.dueDate < data.issueDate) {
      ctx.addIssue({
        path: ["dueDate"],
        code: z.ZodIssueCode.custom,
        message: "Due date must be after or equal to issue date",
      });
    }
  });
