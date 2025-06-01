//src/models/payment.model.ts
import { Schema, model } from 'mongoose';
import { IPayment } from '../types/finance/finance.types';
import { PaymentMethod, PaymentStatus } from '../types/enum/enum';

const PaymentSchema = new Schema<IPayment>(
    {
        student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
        fee: { type: Schema.Types.ObjectId, ref: 'Fee' },
        invoice: { type: Schema.Types.ObjectId, ref: 'Invoice' },
        amountPaid: { type: Number, required: true },
        paymentDate: { type: Date, required: true },
        method: { type: String, enum: Object.values(PaymentMethod), required: true },
        referenceNumber: { type: String },
        transactionId: { type: String },
        balance: { type: Number, required: true },
        status: { type: String, enum: Object.values(PaymentStatus), required: true },
        receiptNumber: { type: String },
        school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
        verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);
export const PaymentModel = model<IPayment>('Payment', PaymentSchema);
