//src/types/enum.ts
export enum UserRole {
  Headteacher = "headteacher",
  Teacher = "teacher",
  SchoolAdmin = "school-admin",
  Guardian = "guardian",
  Accountant = "accountant",
}

export enum StudentGender {
  Boy = "boy",
  Girl = "girl",
}

export enum StudentStatus {
  Active = "active",
  Inactive = "inactive",
  Completed = "completed",
  Transferred = "transferred",
}

export enum ExamType {
  Internal = "internal",
  External = "external",
}

export enum AttendanceStatus {
  Present = "present",
  Absent = "absent",
}

export enum Term {
  Term1 = "term1",
  Term2 = "term2",
  Term3 = "term3",
}

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
