//client/src/context/student/student-form-provider.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type {
  
  StudentFormData,
  StudentGender,
  StudentStatus,
} from '../../types';
import { StudentFormContext } from './student-form.context';
import { useClassOptions, useSchoolBySlug } from '../../hooks';


export const StudentFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { slug } = useParams();
  const { schoolId, error: schoolError } = useSchoolBySlug(slug);
  const { classOptions, loading, error: classError } = useClassOptions(schoolId);

  const [formData, setFormData] = useState<StudentFormData>({
    studentFirstName: '',
    studentMiddleName: '',
    studentLastName: '',
    studentGender: '' as StudentGender,
    dateOfBirth: '',
    admissionDate: '',
    previousSchool: '',
    classId: '',
    stream: '',
    status: '' as StudentStatus,
    studentPhotoUrl: '',
    school: '',
  });

  useEffect(() => {
    if (!schoolId || formData.school === schoolId) return;
    setFormData((prev) => ({ ...prev, school: schoolId }));
  }, [schoolId, formData.school]);

  const updateForm = (data: Partial<StudentFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData({
      studentFirstName: '',
      studentMiddleName: '',
      studentLastName: '',
      studentGender: '' as StudentGender,
      dateOfBirth: '',
      admissionDate: '',
      previousSchool: '',
      classId: '',
      stream: '',
      status: '' as StudentStatus,
      studentPhotoUrl: '',
      school: schoolId || '',
    });
  };

  return (
    <StudentFormContext.Provider
      value={{
        formData,
        updateForm,
        resetForm,
        classOptions,
        loading,
        error: schoolError || classError,
      }}
    >
      {children}
    </StudentFormContext.Provider>
  );
};
