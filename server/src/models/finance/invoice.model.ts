//src/models/finance/invoice.model.ts
import { Schema, model } from 'mongoose';
import { InvoiceStatus } from '../../types/enum/enum';
import { IInvoice } from '../../types';

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
    classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
    items: [
      {
        fee: { type: Schema.Types.ObjectId, ref: 'Fee', required: true },
        amount: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    amountPaid: { type: Number, required: true },
    balance: { type: Number, required: true },
    issueDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: Object.values(InvoiceStatus), required: true },
    paymentHistory: [{ type: Schema.Types.ObjectId, ref: 'Payment' }],
    notes: { type: String },
    termsAndConditions: { type: String },
    lateFee: { type: Number },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

export const InvoiceModel = model<IInvoice>('Invoice', InvoiceSchema);
