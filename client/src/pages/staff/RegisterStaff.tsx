import { useState } from "react";
import { StaffForm } from "../../components";
import { createStaff } from "../../api/StaffApi";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import Swal from "sweetalert2";
import type { CreateStaffDTO } from "../../types/people/StaffTypes";

const RegisterStaffPage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload: CreateStaffDTO) => {
    try {
      setLoading(true);
      await createStaff(payload);
      Swal.fire("Success", "Staff member registered successfully", "success");
    } catch {
      Swal.fire("Error", "Registration failed", "error");
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
          <h1 className="text-xl font-bold mb-4">Register Staff</h1>
          <StaffForm schoolId="" onSubmit={handleSubmit} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default RegisterStaffPage;
