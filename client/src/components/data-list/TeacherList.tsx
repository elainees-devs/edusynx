// client/src/components/data-list/TeacherList.tsx
import React, { useEffect, useState, useCallback } from "react";
import type { Teacher } from "../../types/school/Allocation";
import { deleteUser, getTeachers, updateUser} from "../../api";
import { TeacherTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";

const TeachersList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  /* =========================
     LOAD TEACHERS WITH PAGINATION & SEARCH
  ========================= */
  const loadTeachers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getTeachers({ page, limit, search: searchTerm, sort: sortAsc ? "asc" : "desc" });

      setTeachers(res.data); // API should return { data: Teacher[], totalPages: number }
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load teachers:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm]);

  useEffect(() => {
    loadTeachers();
  }, [loadTeachers]);

  const { placeholder } = searchConfig.teacher;

  /* =========================
     EDIT TEACHER
  ========================= */
  const handleEdit = async (id: string, data: Partial<Teacher>) => {
    try {
      const updatedTeacher = await updateUser(id, data);
      setTeachers((prev) =>
        prev.map((t) => (t._id === id ? updatedTeacher : t))
      );
      Swal.fire("Success", "Teacher updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  /* =========================
     DELETE TEACHER
  ========================= */
  const handleDelete = async (teacher: Teacher) => {
    const result = await Swal.fire({
      title: "Delete teacher?",
      text: `${teacher.firstName} ${teacher.lastName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteUser(teacher._id);
      setTeachers((prev) => prev.filter((t) => t._id !== teacher._id));
      Swal.fire("Deleted", "Teacher removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Teachers</h1>

      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading teachers...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <TeacherTable
            teachers={teachers}
            page={page}
            limit={limit}
            onToggleStatus={(id: string) => {
              setTeachers((prev) =>
                prev.map((t) =>
                  t._id === id ? { ...t, isActive: !t.isActive } : t
                )
              );
              // Handle toggle status logic here
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

export default TeachersList;
