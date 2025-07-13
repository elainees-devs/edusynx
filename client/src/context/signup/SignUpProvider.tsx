// client/src/context/signup/signUpContext.ts
import React, { useState } from 'react';
import { SignUpContext } from './signUpContext';
import type { SignUpFormData } from '../../types/school/signup.types';


interface Props {
  children: React.ReactNode;
}

const SignUpProvider: React.FC<Props> = ({ children }) => {
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

export default SignUpProvider;
