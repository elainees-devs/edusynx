import React, { useEffect, useState, useCallback } from "react";
import type { IStaff } from "../../types/people/StaffTypes";
import { getAllStaff, updateStaff, deleteStaff } from "../../api/StaffApi";
import { StaffTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";

const StaffList: React.FC = () => {
  const [staff, setStaff] = useState<IStaff[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState("");
  const limit = 10;

  const loadStaff = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllStaff({
        schoolId: "",
        role: roleFilter || undefined,
        search: searchTerm || undefined,
        page,
        limit,
        sort: sortAsc ? "asc" : "desc",
      });
      setStaff(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load staff:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm, roleFilter]);

  useEffect(() => {
    loadStaff();
  }, [loadStaff]);

  const { placeholder } = searchConfig.staff;

  const handleEdit = async (id: string, data: Partial<IStaff>) => {
    try {
      const updated = await updateStaff(id, data);
      setStaff((prev) => prev.map((s) => (s._id === id ? updated : s)));
      Swal.fire("Success", "Staff updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = async (staffMember: IStaff) => {
    const result = await Swal.fire({
      title: "Delete staff member?",
      text: `${staffMember.firstName} ${staffMember.lastName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteStaff(staffMember._id!);
      setStaff((prev) => prev.filter((s) => s._id !== staffMember._id));
      Swal.fire("Deleted", "Staff removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <SearchBar
          placeholder={placeholder}
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            setPage(1);
          }}
        />
        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="border p-2 rounded text-sm"
        >
          <option value="">All Roles</option>
          <option value="teacher">Teacher</option>
          <option value="principal">Principal</option>
          <option value="deputy-principal">Deputy Principal</option>
          <option value="accountant">Accountant</option>
          <option value="school-admin">School Admin</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading staff...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <StaffTable
            staff={staff}
            page={page}
            limit={limit}
            onToggleStatus={(id: string) => {
              const s = staff.find((x) => x._id === id);
              if (!s) return;
              handleEdit(id, { isActive: !s.isActive });
            }}
            onSort={() => setSortAsc((prev) => !prev)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default StaffList;
