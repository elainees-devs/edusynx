// client/src/context/student-form-context.ts
import { createContext } from 'react';
import type { SubjectFormContextType } from '../types';


export const SubjectFormContext = createContext<SubjectFormContextType | undefined>(undefined);
