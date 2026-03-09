// client/src/context/signup/signUpContext.ts
import { createContext } from "react";
import type { SignUpContextType } from "../../types/school/SignupTypes";

export const SignUpContext = createContext<SignUpContextType | undefined>(
  undefined,
);
