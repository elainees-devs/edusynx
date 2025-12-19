//client/src/context/subject/subject-form-provider.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import type { ISubject, SubjectData } from "../types";
import { useClassOptions, useSchoolBySlug } from "../hooks";
import { SubjectFormContext } from "./subject-form.context";

export const SubjectFormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { slug } = useParams();
  const { schoolId, error: schoolError } = useSchoolBySlug(slug);
  const {
    classOptions,
    loading,
    error: classError,
  } = useClassOptions(schoolId);

  const [formData, setFormData] = useState<SubjectData>({
    subjectName: "",
    classRef: "",
    _id: "",
    school: schoolId || "",
  });

  useEffect(() => {
    if (!schoolId || formData.school === schoolId) return;
    setFormData((prev) => ({ ...prev, school: schoolId }));
  }, [schoolId, formData.school]);

  const updateForm = (data: Partial<ISubject>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData({
      subjectName: "",
      classRef: "",
      _id: "",
      school: schoolId || "",
    });
  };

  return (
    <SubjectFormContext.Provider
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
    </SubjectFormContext.Provider>
  );
};
