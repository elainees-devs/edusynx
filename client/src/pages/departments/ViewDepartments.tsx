import { useState } from "react";
import { DepartmentList, DepartmentForm } from "../../components";
import { updateDepartment } from "../../api/DepartmentApi";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import Swal from "sweetalert2";
import type { IDepartment } from "../../types/school/AcademicTypes";
import type { UpdateDepartmentDTO } from "../../api/DepartmentApi";

const ViewDepartmentsPage = () => {
  const [editing, setEditing] = useState<IDepartment | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (dept: IDepartment) => {
    setEditing(dept);
  };

  const handleUpdate = async (payload: UpdateDepartmentDTO) => {
    if (!editing?._id) return;
    try {
      setLoading(true);
      await updateDepartment(editing._id, payload);
      Swal.fire("Success", "Department updated", "success");
      setEditing(null);
    } catch {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="principal" />
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Departments</h1>
          {editing ? (
            <div>
              <h2 className="text-lg font-semibold mb-2">Edit Department</h2>
              <DepartmentForm
                initial={editing}
                schoolId=""
                onSubmit={handleUpdate}
                loading={loading}
              />
              <button
                onClick={() => setEditing(null)}
                className="mt-2 text-sm text-gray-600 hover:text-gray-800"
              >
                ← Back to list
              </button>
            </div>
          ) : (
            <DepartmentList onEdit={handleEdit} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDepartmentsPage;
