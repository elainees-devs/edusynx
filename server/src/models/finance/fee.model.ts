// server/src/models/finance/fee.model.ts
import { Schema, model} from 'mongoose';
import { FeeType, RecurringInterval, Term } from '../../types/enum/enum';
import { IFee } from '../../types';

const FeeSchema = new Schema<IFee>(
    {
  feeType: { type: String, enum: Object.values(FeeType), required: true },
  feeName: { type: String, required: true },
  description: { type: String },
  amount: { type: Number, required: true },
  term: { type: String, enum: Object.values(Term), required: true },
  classId: { type: Schema.Types.ObjectId, ref: 'Class', required: true },
  school: { type: Schema.Types.ObjectId, ref: 'School', required: true },
  dueDate: { type: Date, required: true },
  isRecurring: { type: Boolean, default: false },
  recurringInterval: { type: String, enum: Object.values(RecurringInterval) },
  academicTerm: { type: String, required: true },
},
  {timestamps: true}
);     

export const FeeModel = model<IFee>('Fee', FeeSchema);