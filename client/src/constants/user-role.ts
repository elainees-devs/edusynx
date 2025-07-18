// client/src/constants/user-role.ts
export const UserRole = {
  HEADTEACHER: "headteacher",
  TEACHER: "teacher",
  SCHOOL_ADMIN: "school-admin",
  GUARDIAN: "guardian",
  ACCOUNTANT: "accountant",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];