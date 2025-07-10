// server/src/types/enum/enum.ts
export enum LoginFailureReason {
  INVALID_CREDENTIALS = "Invalid credentials",
  USER_NOT_FOUND = "User not found",
  ACCOUNT_LOCKED = "Account locked",
  OTHER = "Other",
}

export enum UserRole {
  HEADTEACHER = "headteacher",
  TEACHER = "teacher",
  SCHOOL_ADMIN = "school-admin",
  GUARDIAN = "guardian",
  ACCOUNTANT = "accountant",
  SUPER_ADMIN = "super-admin",
}

export enum StudentGender {
  BOY = "boy",
  GIRL = "girl",
}

export enum StudentStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  COMPLETED = "completed",
  TRANSFERRED = "transferred",
}

export enum ExamType {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
}

export enum Term {
  TERM1 = "term1",
  TERM2 = "term2",
  TERM3 = "term3",
}

export enum FeeType {
  TUITION = "tuition",
  ADMISSION = "admission",
  EXAM = "exam",
  LIBRARY = "library",
  TRANSPORT = "transport",
  TRIP = "trip",
  OTHER = "other",
}

export enum PaymentMethod {
  MPESA = "mpesa",
  BANK_TRANSFER = "bank_transfer",
  CHEQUE = "cheque",
  CASH = "cash",
  CREDIT_CARD = "credit_card",
  OTHER = "other",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  REFUNDED = "refunded",
  PARTIALLY_REFUNDED = "partially_refunded",
}

export enum InvoiceStatus {
  ISSUED = "issued",
  PAID = "paid",
  UNPAID = "unpaid",
  PARTIALLY_PAID = "partially_paid",
  OVERDUE = "overdue",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
}

export enum RecurringInterval {
  MONTHLY = "monthly",
  TERMLY = "termly",
  ANNUALLY = "annually",
}
