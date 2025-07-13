// client/src/context/signup/useSignUpContext.ts
import { useContext } from 'react';
import { SignUpContext } from './signUpContext';

export const useSignUpContext = () => {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error('useSignUpContext must be used within a SignUpProvider');
  }
  return context;
};
