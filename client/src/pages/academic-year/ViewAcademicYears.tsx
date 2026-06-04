import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Sidebar, Topbar } from "../../shared";
import AcademicYearList from "../../components/data-list/AcademicYearList";
import AcademicYearForm from "../../components/forms/AcademicYearForm";
import { updateAcademicYear } from "../../api/AcademicYearApi";
import { useGlobalState } from "../../hooks";
import { getSchoolId } from "../../utils/GetSchoolId";
import type { IAcademicYear } from "../../types/school/AcademicYearTypes";

const ViewAcademicYears: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const user = state.loggedInUser as { role: string; school?: string | { _id: string; isActive: boolean } } | undefined;
  const schoolId = getSchoolId(user) ?? "";
  const [editTarget, setEditTarget] = useState<IAcademicYear | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (item: IAcademicYear) => setEditTarget(item);

  const handleUpdate = async (payload: any) => {
    if (!editTarget) return;
    await updateAcademicYear(editTarget._id, payload);
    setEditTarget(null);
    setRefreshKey((k) => k + 1);
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
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-semibold">Academic Years</h1>
            <button
              onClick={() => navigate("/academic-years/register")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              <FaPlus /> New Academic Year
            </button>
          </div>

          <AcademicYearList schoolId={schoolId} onEdit={handleEdit} refreshKey={refreshKey} />

          {editTarget && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded shadow-lg p-6 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Edit Academic Year</h2>
                <AcademicYearForm
                  initial={editTarget}
                  schoolId={schoolId}
                  onSubmit={handleUpdate}
                />
                <button
                  onClick={() => setEditTarget(null)}
                  className="mt-2 text-gray-600 hover:text-gray-800 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAcademicYears;
