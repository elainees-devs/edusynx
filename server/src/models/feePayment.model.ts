//src/models/feePayment.model.ts
import { Schema, model } from "mongoose";
import { IFeePaymentSummary } from "../types/finance/finance.types";

const FeePaymentSummarySchema = new Schema<IFeePaymentSummary>(
  {
    fee: { type: Schema.Types.ObjectId, ref: "Fee", required: true },
    totalPaid: { type: Number, required: true },
    totalBalance: { type: Number, required: true },
    payments: [{ type: Schema.Types.ObjectId, ref: "Payment" }],
    lastPaymentDate: { type: Date },
  },
  { timestamps: true }
);
export const FeePaymentSummaryModel = model<IFeePaymentSummary>(
  "FeePaymentSummary",
  FeePaymentSummarySchema
);
