//src/models/invoiceItem.model.ts
import { Schema, model, Types, Document } from 'mongoose';
import { IFee, IStudent } from '../types';


export interface IInvoiceItem extends Document {
  student: Types.ObjectId | IStudent;
  fee: Types.ObjectId | IFee;
  amount: number;
  originalAmount?: number;
  description?: string;
}

const InvoiceItemSchema = new Schema<IInvoiceItem>({
  student: {
    type: Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  fee: {
    type: Types.ObjectId,
    ref: 'Fee',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  originalAmount: {
    type: Number,
  },
  description: {
    type: String,
  },
});

export const InvoiceItemModel = model<IInvoiceItem>('InvoiceItem', InvoiceItemSchema);
