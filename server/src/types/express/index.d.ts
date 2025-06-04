//src/types/express/index.d.ts
import { IGuardianUser, ITeacherUser } from "../people/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: IGuardianUser | ITeacherUser;
    }
  }
}
