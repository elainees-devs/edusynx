//src/types/finance/finance.types.ts
import { Types } from "mongoose";
import { IStudent } from "../people/student.types";
import { IBaseUser } from "../people/user.types";
import {
  FeeType,
  InvoiceStatus,
  PaymentMethod,
  PaymentStatus,
  RecurringInterval,
  Term,
} from "../enum/enum";
import { BaseDocument } from "../common/base.types";
import { IClass, ISchool } from "../school/school-core.types";

export interface IFee extends BaseDocument {
  feeType: FeeType;
  feeName: string;
  description?: string;
  amount: number;
  term: Term;
  classId: Types.ObjectId | IClass;
  school: Types.ObjectId | ISchool;
  dueDate: Date;
  isRecurring?: boolean;
  recurringInterval?: RecurringInterval;
  academicTerm: string;
}

export interface IPayment extends BaseDocument {
  student: Types.ObjectId | IStudent;
  fee?: Types.ObjectId | IFee;
  invoice?: Types.ObjectId | IInvoice;
  amountPaid: number;
  paymentDate: Date;
  method: PaymentMethod;
  referenceNumber?: string;
  transactionId?: string;
  balance: number;
  status: PaymentStatus;
  receiptNumber?: string;
  school: Types.ObjectId | ISchool;
  verifiedBy?: Types.ObjectId | IBaseUser;
}

export interface IFeePaymentSummary {
  fee: IFee;
  totalPaid: number;
  totalBalance: number;
  payments: IPayment[];
  lastPaymentDate?: Date;
}

export interface IInvoiceItem {
  fee: Types.ObjectId | IFee;
  amount: number;
  originalAmount?: number;
  description?: string;
}

export interface IInvoice extends BaseDocument {
  invoiceNumber: string;
  student: Types.ObjectId | IStudent;
  school: Types.ObjectId | ISchool;
  classId: Types.ObjectId | IClass;
  items: IInvoiceItem[];
  totalAmount: number;
  amountPaid: number;
  balance: number;
  issueDate: Date;
  dueDate: Date;
  status: InvoiceStatus;
  paymentHistory?: Types.ObjectId[] | IPayment[];
  notes?: string;
  termsAndConditions?: string;
  lateFee?: number;
  createdBy?: Types.ObjectId | IBaseUser;
}

export interface IFinancialReport extends BaseDocument {
  school: Types.ObjectId | ISchool;
  academicYear: string;
  term: string;
  totalFeesCollected: number;
  totalPaymentsMade: number;
  outstandingFees: number;
  reportDate?: Date;
  createdBy: Types.ObjectId | IBaseUser;
}
