// client/src/constants/user-role.ts
export const UserRole = {
  HEADTEACHER: "headteacher",
  TEACHER: "teacher",
  SCHOOL_ADMIN: "school-admin",
  GUARDIAN: "guardian",
  ACCOUNTANT: "accountant",
  SUPER_ADMIN:"super-admin"
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];