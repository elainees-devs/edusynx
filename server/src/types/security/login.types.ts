//src/types/security/login.types.ts
import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISession } from "./session.types";
import { IBaseUser } from "../people/user.types";
import { ILoginBase } from "../common/auth-context.types";

export interface ILogin extends BaseDocument, ILoginBase {
  userId: Types.ObjectId | IBaseUser
  sessionId?: string | ISession;
  isSuccessful: boolean; 
  failureReason?: string;
}
