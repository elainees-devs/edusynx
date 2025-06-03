//src/models/counter.model.ts
import { Schema, model, Types } from "mongoose";
import { IInvoiceCounter } from "../types/finance/counter.types";

const CounterSchema = new Schema<IInvoiceCounter>(
  {
    school: { type: Types.ObjectId, ref: "School", required: true, unique: true },
    seq: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const CounterModel = model<IInvoiceCounter>("InvoiceCounter", CounterSchema);

