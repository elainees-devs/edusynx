// client/src/constants/data/head-teacher-dashboard.ts
export interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

export interface FeeAlert {
  studentName: string;
  className: string;
  overdueAmount: number;
}

export interface AttendanceAlert {
  studentName: string;
  className: string;
  attendanceRate: number;
}