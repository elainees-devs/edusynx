import { useState } from "react";
import { DepartmentForm } from "../../components";
import { createDepartment } from "../../api/DepartmentApi";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import Swal from "sweetalert2";
import type { CreateDepartmentDTO } from "../../api/DepartmentApi";

const RegisterDepartmentPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload: CreateDepartmentDTO) => {
    try {
      setLoading(true);
      await createDepartment(payload);
      Swal.fire("Success", "Department created", "success");
    } catch {
      Swal.fire("Error", "Creation failed", "error");
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
          <h1 className="text-xl font-bold mb-4">Register Department</h1>
          <DepartmentForm schoolId="" onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default RegisterDepartmentPage;
