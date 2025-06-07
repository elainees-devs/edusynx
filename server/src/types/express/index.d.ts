//src/types/express/index.d.ts
import {IBaseUser, IGuardian, ITeacher} from "../people/user.types";
import { ILoginBase } from "../../common/auth-context.types";

declare global {
  namespace Express {
    interface Request {
      user?: IGuardian | ITeacher | IBaseUser;
      loginInfo?: ILoginBase;
    }
  }
}





