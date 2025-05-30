//src/types/finance/finance.ts
import { Types } from "mongoose";
import { IStudent } from "../people/student";
import { ISchool, IClass } from "../school/school";
import { IBaseUser } from "../people/user";
import { Term } from "../term";

export enum FeeType {
  Tuition = "tuition",
  Admission = "admission",
  Exam = "exam",
  Library = "library",
  Transport = "transport",
  Trip = "trip",
  Other = "other",
}

export enum PaymentMethod {
  Mpesa = "mpesa",
  BankTransfer = "bank_transfer",
  Cheque = "cheque",
  Cash = "cash",
  CreditCard = "credit_card",
  Other = "other",
}

export enum PaymentStatus {
  Pending = "pending",
  Completed = "completed",
  Failed = "failed",
  Refunded = "refunded",
  PartiallyRefunded = "partially_refunded",
}

export enum InvoiceStatus {
  Draft = "draft",
  Issued = "issued",
  Paid = "paid",
  PartiallyPaid = "partially_paid",
  Overdue = "overdue",
  Cancelled = "cancelled",
  Refunded = "refunded",
}

export enum RecurringInterval {
  Monthly = "monthly",
  Termly = "termly",
  Annually = "annually",
}


export interface IFee {
  _id: Types.ObjectId;
  fee_type: FeeType;
  fee_name: string;
  description?: string;
  amount: number;
  term: Term;
  class: Types.ObjectId | IClass;
  school: Types.ObjectId | ISchool;
  dueDate: Date;
  isRecurring?: boolean;
  recurringInterval?: RecurringInterval;
  academicTerm: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPayment {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
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

export interface IInvoice {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface IFinancialReport {
  totalFees: number;
  totalPayments: number;
  outstandingBalance: number;
  overdueInvoices: number;
  recentPayments: IPayment[];
}
