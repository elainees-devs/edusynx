// client/src/pages/subject/register-subject.tsx
import React from "react";

import Swal from "sweetalert2";

import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import { registerSubject } from "../../api/subject.api"
import { getSchoolId } from "../../utils/getSchoolId"
import { useGlobalState } from "../../hooks";
import { RegisterSubjectForm } from "../../components";
import type { SubjectData } from "../../types";
import { SubjectFormProvider } from "../../context/subject-form-provider";


const RegisterSubject: React.FC = () => {
    const { state } = useGlobalState();
  
    const user = state.loggedInUser as
      | { role: string; school?: string | { _id: string; isActive: boolean } }
      | undefined;
  
    const schoolId = getSchoolId(user);
  const handleSubjectSubmit = async (data: SubjectData): Promise<void> => {
  if (!schoolId) {
    Swal.fire("Error", "School ID is missing. Please log in again.", "error");
    return;
  }

  try {
    const payload: SubjectData = {
      ...data,
      school: schoolId,
    };

    const savedSubject = await registerSubject(payload); 

    Swal.fire({
      icon: "success",
      title: "Subject Registered!",
      html: `<p>Saved Subject: <strong>${savedSubject}</strong></p>`,
      confirmButtonText: "OK",
    });
  } catch (error) {
    let message = "Something went wrong. Please try again.";

    if (error instanceof Error) {
      message = error.message;
    } else if (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as { message: unknown }).message === "string"
    ) {
      message = (error as { message: string }).message;
    }

    Swal.fire({
      icon: "error",
      title: "Registration failed",
      text: message,
    });
  }
};



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="school-admin" />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="headteacher" />
        </div>
       
        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <SubjectFormProvider>
            <div className="max-w-xl w-full mx-auto mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Register New Subject
              </h2>
              <RegisterSubjectForm onSubmit={handleSubjectSubmit} />
            </div>
          </SubjectFormProvider>
        </div>
      </div>
    </div>
  );
};

export default RegisterSubject;

