import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidebar, Topbar } from "../../shared";
import EnrollmentForm from "../../components/forms/EnrollmentForm";
import BulkEnrollmentForm from "../../components/forms/BulkEnrollmentForm";
import { createEnrollment } from "../../api/EnrollmentApi";
import { useGlobalState } from "../../hooks";
import { getSchoolId } from "../../utils/GetSchoolId";

const RegisterEnrollment: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useGlobalState();
  const user = state.loggedInUser as { role: string; school?: string | { _id: string; isActive: boolean } } | undefined;
  const schoolId = getSchoolId(user) ?? "";
  const [mode, setMode] = useState<"single" | "bulk">(
    location.pathname.includes("/bulk") ? "bulk" : "single"
  );

  const handleCreate = async (payload: any) => {
    await createEnrollment(payload as any);
    navigate("/enrollments");
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role={["school-admin", "principal"]} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-shrink-0">
          <Topbar role={["school-admin", "principal"]} />
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-xl font-semibold">Register Enrollment</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setMode("single")}
                className={`px-3 py-1 text-sm rounded ${mode === "single" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Single
              </button>
              <button
                onClick={() => setMode("bulk")}
                className={`px-3 py-1 text-sm rounded ${mode === "bulk" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
              >
                Bulk
              </button>
            </div>
          </div>

          {mode === "single" ? (
            <EnrollmentForm schoolId={schoolId} onSubmit={handleCreate} />
          ) : (
            <BulkEnrollmentForm schoolId={schoolId} onSuccess={() => navigate("/enrollments")} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterEnrollment;
