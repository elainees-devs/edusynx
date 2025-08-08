// client/src/pages/student/register-student.tsx
import React from "react";
import type { StudentFormData } from "../../types";
import Swal from "sweetalert2";
import { StudentFormProvider } from "../../context/student/student-form-context";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import { registerStudent } from "../../api/student.api";
import { useGlobalState } from "../../hooks/useGlobalContext";
import { getSchoolId } from "../../utils/getSchoolId";
import { RegisterStudentForm } from "../../components/forms";

const RegisterStudent: React.FC = () => {
    const { state } = useGlobalState();
  
    const user = state.loggedInUser as
      | { role: string; school?: string | { _id: string; isActive: boolean } }
      | undefined;
  
    const schoolId = getSchoolId(user);
  const handleStudentSubmit = async (data: StudentFormData): Promise<void> => {
  if (!schoolId) {
    Swal.fire("Error", "School ID is missing. Please log in again.", "error");
    return;
  }

  try {
    const payload: StudentFormData = {
      ...data,
      school: schoolId,
    };

    const savedStudent = await registerStudent(payload); // Expecting admNo in response

    Swal.fire({
      icon: "success",
      title: "Student Registered!",
      html: `<p>Admission Number: <strong>${savedStudent.adm}</strong></p>`,
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
          <StudentFormProvider>
            <div className="max-w-xl w-full mx-auto mt-6">
              <h2 className="text-2xl font-semibold mb-4">
                Register New Student
              </h2>
              <RegisterStudentForm onSubmit={handleStudentSubmit} />
            </div>
          </StudentFormProvider>
        </div>
      </div>
    </div>
  );
};

export default RegisterStudent;
