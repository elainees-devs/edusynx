// src/validation/payment.schema.ts
import { z } from "zod";
import { PaymentMethod, PaymentStatus } from "../types/enum/enum";
import { objectId } from "./util";

export const createPaymentSchema = z.object({
  student: objectId,
  fee: objectId.optional(),
  invoice: objectId.optional(),
  amountPaid: z.number().min(0, "Amount paid must be a positive number"),
  paymentDate: z.coerce.date(),
  method: z.nativeEnum(PaymentMethod),
  referenceNumber: z.string().optional(),
  transactionId: z.string().optional(),
  balance: z.number().min(0, "Balance must be a positive number"),
  status: z.nativeEnum(PaymentStatus),
  receiptNumber: z.string().optional(),
  school: objectId,
  verifiedBy: objectId.optional(),
});

export const updatePaymentSchema = createPaymentSchema.partial();
