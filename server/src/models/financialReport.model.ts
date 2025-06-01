//src/models/financialReport.model.ts
import { Schema, model } from "mongoose";
import { IFinancialReport } from "../types";

const FinancialReportSchema = new Schema<IFinancialReport>(
  {
    school: { type: Schema.Types.ObjectId, ref: "School", required: true },
    academicYear: { type: String, required: true },
    term: { type: String, required: true },
    totalFeesCollected: { type: Number, required: true },
    totalPaymentsMade: { type: Number, required: true },
    outstandingFees: { type: Number, required: true },
    reportDate: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);
export const FinancialReportModel = model<IFinancialReport>(
  "FinancialReport",
  FinancialReportSchema
);
