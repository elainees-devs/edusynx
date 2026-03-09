// client/src/api/index.ts
export * from "./StudentApi";
export * from "./GuardianApi";
export * from "./BaseUserApi";
export * from "./ClassApi";
export * from "./StreamApi";
export * from "./SubjectApi";
export * from "./SchoolApi";
export * from "./EmailApi";
export * from "./AuthApi";
export * from "./ClassTeacherApi";
export * from "./AttendanceApi";

export { loginSuperAdmin, sendPasswordResetEmail } from "./auth/SuperAdminAuth";