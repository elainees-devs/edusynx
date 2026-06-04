// server/src/types/express/index.d.ts

import { IStaff } from "../../people/staff.types";
import { ILoginBase } from "../../common/auth-context.types";

declare global {
  namespace Express {
    interface Request {
      user?: IGuardian | ITeacher | IBaseUser | IStaff | ISuperAdmin;
      loginInfo?: ILoginBase;
      tenant?: any;
    }
  }
}