// client/src/hooks/useStudentFormContext.ts
import { useContext } from 'react';
import { StudentFormContext } from '../context/student/student-form.context';


export const useStudentFormContext = () => {
  const context = useContext(StudentFormContext);
  if (!context) {
    throw new Error('useStudentFormContext must be used within a StudentFormProvider');
  }
  return context;
};
