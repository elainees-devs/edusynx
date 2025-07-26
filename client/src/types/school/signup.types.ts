// client/src/types/school/signup.types.ts
export type Role = 'school-admin' | 'teacher' | 'headteacher' | 'accountant';

export interface SignUpFormData {
  role?: Role
  school?: string
  firstName?: string
  middleName?: string
  lastName?: string
  email?: string
  secondaryEmail?: string
  primaryPhoneNumber?: string
  secondaryPhoneNumber?: string
  password: string
  confirmPassword?: string
  nationality?: string
  avatarUrl?: string
  isTwoFactorEnabled?: boolean
  teacherId: string
  classId: string
  isClassTeacher?:boolean
  isActive: boolean
  isLocked: boolean

}

export interface SignUpContextType {
  formData: SignUpFormData;
  updateForm: (data: Partial<SignUpFormData>) => void;
  resetForm: () => void;
}
