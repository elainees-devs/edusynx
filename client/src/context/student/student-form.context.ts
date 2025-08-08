// client/src/context/student-form-context.ts
import { createContext } from 'react';
import type { StudentFormContextType } from '../../types';

export const StudentFormContext = createContext<StudentFormContextType | undefined>(undefined);
