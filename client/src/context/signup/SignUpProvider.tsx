// client/src/context/signup/SignUpProvider.tsx
import React, { useState } from "react";
import { SignUpContext } from "./signUpContext";
import type { SignUpFormData } from "../../types/school/SignupTypes";

interface Props {
  children: React.ReactNode;
}

const SignUpProvider: React.FC<Props> = ({ children }) => {
  const initialFormData: SignUpFormData = {
    password: "",
    teacherId: "",
    isActive: false,
    isLocked: false,
    classId: "",
  };
  const [formData, setFormData] = useState<SignUpFormData>(initialFormData);

  const updateForm = (data: Partial<SignUpFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => setFormData(initialFormData);

  return (
    <SignUpContext.Provider value={{ formData, updateForm, resetForm }}>
      {children}
    </SignUpContext.Provider>
  );
};

export default SignUpProvider;
