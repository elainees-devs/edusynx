import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStaffById } from "../../api/StaffApi";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import type { IStaff } from "../../types/people/StaffTypes";

const StaffDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<IStaff | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getStaffById(id)
      .then(setStaff)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto"><Sidebar role="principal" /></div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar role="principal" />
          <div className="flex-1 overflow-y-auto p-4 text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="flex h-screen">
        <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto"><Sidebar role="principal" /></div>
        <div className="flex flex-col flex-1 overflow-hidden">
          <Topbar role="principal" />
          <div className="flex-1 overflow-y-auto p-4 text-center text-red-500">Staff not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="principal" />
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Staff Detail</h1>
          <div className="max-w-lg p-4 border rounded shadow space-y-3">
            <p><strong>Employee No:</strong> {staff.employeeNumber}</p>
            <p><strong>Name:</strong> {staff.firstName} {staff.middleName ? staff.middleName + " " : ""}{staff.lastName}</p>
            <p><strong>Email:</strong> {staff.email}</p>
            <p><strong>Phone:</strong> {staff.primaryPhoneNumber}</p>
            <p><strong>Role:</strong> {staff.role}</p>
            <p><strong>Position:</strong> {staff.position || "-"}</p>
            <p><strong>Nationality:</strong> {staff.nationality}</p>
            <p><strong>Status:</strong> {staff.isActive ? "Active" : "Inactive"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailPage;
