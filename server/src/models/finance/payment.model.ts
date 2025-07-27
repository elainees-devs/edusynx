// server/src/models/finance/payment.model.ts
import { Schema, model } from 'mongoose';
import { PaymentMethod, PaymentStatus } from '../../types/enum/enum';
import { IPayment } from '../../types';

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

//Add indexes to optimize queries
PaymentSchema.index({ student: 1 });
PaymentSchema.index({ invoice: 1 });
PaymentSchema.index({ school: 1 });
PaymentSchema.index({ paymentDate: -1 }); // descending: useful for sorting
// compound index to filter by student + date
PaymentSchema.index({ student: 1, paymentDate: -1 });
export const PaymentModel = model<IPayment>('Payment', PaymentSchema);
