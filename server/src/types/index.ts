import { ILoginResponseFailure, ILoginResponseSuccess } from "./auth/auth";

//src/types/index.ts
export * from "./school/school-core.types";
export * from "./school/school-activity.types";
export * from "./people/user.types";
export * from "./people/student.types";
export * from "./finance/finance.types";
export * from "./enum/enum";
export * from "./auth/auth"
export * from "./security/session.types"
export type ILoginResponse = ILoginResponseSuccess | ILoginResponseFailure;





