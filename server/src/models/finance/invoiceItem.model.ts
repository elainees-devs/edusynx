// server/src/models/finance/invoiceItem.model.ts
import { Schema, model, Types} from 'mongoose';
import { IInvoiceItem} from '../../types';


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
