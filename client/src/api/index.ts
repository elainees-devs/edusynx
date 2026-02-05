// client/src/api/index.ts
export * from "./student.api";
export * from "./guardian.api";
export * from "./base-user.api"
export * from "./class.api";
export * from "./stream.api"
export * from "./subject.api";
export * from "./school.api";
export * from "./email.api";
export * from "./auth.api";
export * from "./class.teacher.api";
export * from "./attendance.api";

export {loginSuperAdmin, sendPasswordResetEmail} from "./auth/super-admin-auth";