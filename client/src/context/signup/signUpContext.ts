// client/src/context/signup/signUpContext.ts
import { createContext } from 'react';
import type { SignUpContextType } from '../../types/school/signup.types';


export const SignUpContext = createContext<SignUpContextType | undefined>(undefined);
