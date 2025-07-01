// client/src/hooks/useSignUpContext.tsx
import { createContext, useContext, useState} from 'react';
import type { ReactNode } from "react";

export type Role = 'school-admin' | 'teacher' | 'headteacher' | 'accountant';

export interface SignUpFormData {
  role?: Role;
  school?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  email?: string;
  secondaryEmail?: string;
  primaryPhoneNumber?: string;
  secondaryPhoneNumber?: string;
  password?: string;
  confirmPassword?: string;
  nationality?: string;
  avatarUrl?: string;
  isTwoFactorEnabled?: boolean;

  // Role-specific (for teachers/headteachers)
  teacherId?: string;
  isClassTeacher?: boolean;
  class?: string;
  teachingSubjects?: string[];
}

interface SignUpContextType {
  formData: SignUpFormData;
  updateForm: (data: Partial<SignUpFormData>) => void;
  resetForm: () => void;
}

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

// Provider
export const SignUpProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<SignUpFormData>({});

  const updateForm = (data: Partial<SignUpFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData({});

  return (
    <SignUpContext.Provider value={{ formData, updateForm, resetForm }}>
      {children}
    </SignUpContext.Provider>
  );
};

// Hook
export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUpContext must be used within a SignUpProvider');
  }
  return context;
};
