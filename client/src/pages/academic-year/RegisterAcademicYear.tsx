import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "../../shared";
import AcademicYearForm from "../../components/forms/AcademicYearForm";
import { createAcademicYear } from "../../api/AcademicYearApi";
import { useGlobalState } from "../../hooks";
import { getSchoolId } from "../../utils/GetSchoolId";

const RegisterAcademicYear: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const user = state.loggedInUser as { role: string; school?: string | { _id: string; isActive: boolean } } | undefined;
  const schoolId = getSchoolId(user) ?? "";

  const handleCreate = async (payload: any) => {
    await createAcademicYear(payload as any);
    navigate("/academic-years");
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
          <h1 className="text-xl font-semibold mb-4">Register New Academic Year</h1>
          <AcademicYearForm schoolId={schoolId} onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default RegisterAcademicYear;
