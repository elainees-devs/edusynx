// server/src/types/index.ts

import { ILoginResponseFailure, ILoginResponseSuccess } from "./auth/auth.types";
export * from "./school/school-core.types";
export * from "./school/school-activity.types";
export * from "./school/allocation.types"
export * from "./people/user.types";
export * from "./people/student.types";
export * from "./finance/finance.types";
export * from "./enum/enum";
export * from "./auth/auth.types"
export * from "./security/session.types"
export * from "./email/email.types"
export type ILoginResponse = ILoginResponseSuccess | ILoginResponseFailure;





