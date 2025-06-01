//src/validation/invoice.schema.ts
import { Schema, model } from 'mongoose';
import { IInvoice } from '../types/finance/finance.types';
import { InvoiceStatus } from '../types/enum/enum';

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: 'School',
      required: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
      required: true,
    },
    items: [
      {
        fee: {
          type: Schema.Types.ObjectId,
          ref: 'Fee',
          required: true,
        },
        amount: {
          type: Number,
          required: true,
          min: [0, 'Amount must be a positive number'],
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount must be a positive number'],
    },
    amountPaid: {
      type: Number,
      required: true,
      min: [0, 'Amount paid cannot be negative'],
    },
    balance: {
      type: Number,
      required: true,
      min: [0, 'Balance cannot be negative'],
    },
    issueDate: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (this: IInvoice) {
          return this.dueDate >= this.issueDate;
        },
        message: 'Due date must be after or equal to issue date',
      },
    },
    status: {
      type: String,
      enum: Object.values(InvoiceStatus),
      required: true,
    },
    paymentHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Payment',
      },
    ],
    notes: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    termsAndConditions: {
      type: String,
      trim: true,
      maxlength: 2000,
    },
    lateFee: {
      type: Number,
      min: [0, 'Late fee cannot be negative'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
