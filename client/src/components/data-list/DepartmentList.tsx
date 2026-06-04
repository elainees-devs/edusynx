import React, { useEffect, useState, useCallback } from "react";
import type { IDepartment } from "../../types/school/AcademicTypes";
import {
  getAllDepartments,
  deleteDepartment,
} from "../../api/DepartmentApi";
import { DepartmentTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import Swal from "sweetalert2";

interface DepartmentListProps {
  onEdit?: (dept: IDepartment) => void;
}

const DepartmentList: React.FC<DepartmentListProps> = ({ onEdit }) => {
  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  const loadDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllDepartments({
        page,
        limit,
        search: searchTerm || undefined,
      });
      setDepartments(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load departments:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchTerm]);

  useEffect(() => {
    loadDepartments();
  }, [loadDepartments]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteDepartment(id);
      setDepartments((prev) => prev.filter((d) => d._id !== id));
      Swal.fire("Deleted", "Department removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <SearchBar
        placeholder="Search by department name..."
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading departments...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <DepartmentTable
            departments={departments}
            onEdit={(dept) => onEdit?.(dept)}
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

export default DepartmentList;
