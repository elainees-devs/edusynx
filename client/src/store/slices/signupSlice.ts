import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit' 

import type { ISchool } from '../../types/school/SchoolCoreTypes';
import type { Student } from '../../types/people/StudentTypes';
import type { IBaseUser } from '../../types';


interface SignupState {
  formData: Partial<IBaseUser> & {
    classId?: string;
    isClassTeacher?: boolean;
    familyNumber?: string;
    studentDetails?: Student;
    confirmPassword?: string;
  };
  currentStep: number;
  isLoading: boolean;
  error: string | null;
  schoolDetails: ISchool| null;
}

const initialState: SignupState = {
  formData: {
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: false,
  },
  currentStep: 0,
  isLoading: false,
  error: null,
  schoolDetails: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<SignupState['formData']>>) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    setSchoolDetails: (state, action: PayloadAction<ISchool>) => {
      state.schoolDetails = action.payload;
      state.formData.school = action.payload._id;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload;
    },
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep = Math.max(0, state.currentStep - 1);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetSignup: () => {
      return initialState;
    },
  },
});

export const {
  setFormData,
  setSchoolDetails,
  setCurrentStep,
  nextStep,
  prevStep,
  setLoading,
  setError,
  resetSignup,
} = signupSlice.actions;

export default signupSlice.reducer;
