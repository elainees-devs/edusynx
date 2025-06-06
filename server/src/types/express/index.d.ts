//src/types/express/index.d.ts
import {IGuardian, ITeacher} from "../people/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IGuardian | ITeacher;
    }
  }
}

