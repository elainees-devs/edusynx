// server/src/constants/features.ts
export const FEATURE_KEYS = {
  STUDENT_MANAGEMENT: "student-management",
  ATTENDANCE_MANAGEMENT: "attendance-management",
  MANUAL_INVOICING: "manual-invoicing",
  BASIC_REPORTS: "basic-reports",
  
  MPESA_INTEGRATION: "mpesa-integration",
  EMAIL_ALERTS: "email-alerts",
  SMS_ALERTS: "sms-alerts",
  REALTIME_DASHBOARDS: "real-time-dashboards",

  MULTI_BRANCH: "multi-branch",
  ADVANCED_REPORTS: "advanced-reports",
  API_ACCESS: "api-access",
} as const;

export type FeatureKey = (typeof FEATURE_KEYS)[keyof typeof FEATURE_KEYS];
