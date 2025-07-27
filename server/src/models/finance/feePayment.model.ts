// server/src/models/finance/feePayment.model.ts
import { Schema, model } from "mongoose";
import { IFeePaymentSummary } from "../../types";

const FeePaymentSummarySchema = new Schema<IFeePaymentSummary>(
  {
    student: { type: Schema.Types.ObjectId, ref: "Student", required: true },
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
