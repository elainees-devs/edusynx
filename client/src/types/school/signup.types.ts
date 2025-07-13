// client/src/types/school/signup.types.ts
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

  // Role-specific
  teacherId?: string;
  isClassTeacher?: boolean;
  class?: string;
  teachingSubjects?: string[];
}

export interface SignUpContextType {
  formData: SignUpFormData;
  updateForm: (data: Partial<SignUpFormData>) => void;
  resetForm: () => void;
}
