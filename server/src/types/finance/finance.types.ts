//src/types/finance/finance.types.ts
import { Types } from "mongoose";
import { IStudent } from "../people/student.types";
import { ISchool, IClass } from "../school/school.types";
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

export interface IFee extends BaseDocument {
  feeType: FeeType;
  feeName: string;
  description?: string;
  amount: number;
  term: Term;
  class: Types.ObjectId | IClass;
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
  class: Types.ObjectId | IClass;
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

export interface IFinancialReport {
  totalFees: number;
  totalPayments: number;
  outstandingBalance: number;
  overdueInvoices: number;
  recentPayments: IPayment[];
}
