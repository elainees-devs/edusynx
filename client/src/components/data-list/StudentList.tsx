import React, { useEffect, useState, useCallback } from "react";
import type { Student } from "../../types";
import {
  deleteStudent,
  getStudents,
  graduateStudents,
  updateStudent,
  searchStudents,
} from "../../api";
import { StudentTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";
import { PromoteStudentsForm, TransferStudentForm } from "../forms";

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showPromoteForm, setShowPromoteForm] = useState(false);
  const [transferTarget, setTransferTarget] = useState<Student | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [streamFilter, setStreamFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const limit = 10;

  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const filters: Record<string, any> = {
        page,
        limit,
        search: searchTerm || undefined,
        status: statusFilter || undefined,
        classId: classFilter || undefined,
        streamId: streamFilter || undefined,
        gender: genderFilter || undefined,
      };
      const cleanFilters = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v !== undefined)
      );
      const res = await searchStudents(cleanFilters as any);

      setStudents(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm, statusFilter, classFilter, streamFilter, genderFilter]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const { placeholder } = searchConfig.student;

  const handleEdit = async (id: string, data: Partial<Student>) => {
    try {
      const updatedStudent = await updateStudent(id, data);
      setStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s))
      );
      Swal.fire("Success", "Student updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDelete = async (student: Student) => {
    const result = await Swal.fire({
      title: "Delete student?",
      text: `${student.studentFirstName} ${student.studentLastName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteStudent(student._id);
      setStudents((prev) => prev.filter((s) => s._id !== student._id));
      Swal.fire("Deleted", "Student removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  const handleAddGuardian = () => {
    Swal.fire("Info", "Add Guardian feature coming soon!", "info");
  };

  const handlePromoteSuccess = () => {
    loadStudents();
    setSelectedIds([]);
  };

  const handleGraduateSelected = async () => {
    if (selectedIds.length === 0) {
      Swal.fire("Info", "Select students to graduate", "info");
      return;
    }
    const result = await Swal.fire({
      title: "Graduate selected students?",
      text: `${selectedIds.length} student(s) will be marked as graduated`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Graduate",
    });
    if (!result.isConfirmed) return;

    try {
      const res = await graduateStudents(selectedIds);
      Swal.fire("Success", res.message, "success");
      loadStudents();
      setSelectedIds([]);
    } catch (err: any) {
      Swal.fire("Error", err?.message || "Graduation failed", "error");
    }
  };

  const handleTransferSuccess = (updated: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s._id === updated._id ? updated : s))
    );
    setSelectedIds([]);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Students</h1>

      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="status-filter" className="text-sm font-medium">Status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="border rounded px-3 py-1.5 text-sm"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="transferred">Transferred</option>
            <option value="graduated">Graduated</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="gender-filter" className="text-sm font-medium">Gender:</label>
          <select
            id="gender-filter"
            value={genderFilter}
            onChange={(e) => { setGenderFilter(e.target.value); setPage(1); }}
            className="border rounded px-3 py-1.5 text-sm"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="class-filter" className="text-sm font-medium">Class ID:</label>
          <input
            id="class-filter"
            type="text"
            value={classFilter}
            onChange={(e) => { setClassFilter(e.target.value); setPage(1); }}
            placeholder="Filter by class"
            className="border rounded px-3 py-1.5 text-sm w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="stream-filter" className="text-sm font-medium">Stream ID:</label>
          <input
            id="stream-filter"
            type="text"
            value={streamFilter}
            onChange={(e) => { setStreamFilter(e.target.value); setPage(1); }}
            placeholder="Filter by stream"
            className="border rounded px-3 py-1.5 text-sm w-40"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading students...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setShowPromoteForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              Promote Students
            </button>
            <button
              type="button"
              onClick={handleGraduateSelected}
              disabled={selectedIds.length === 0}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 text-sm"
            >
              Graduate Selected ({selectedIds.length})
            </button>
          </div>

          <StudentTable
            students={students}
            page={page}
            limit={limit}
            onSort={() => setSortAsc((prev) => !prev)}
            onAdd={handleAddGuardian}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTransfer={(s) => setTransferTarget(s)}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}

      {showPromoteForm && (
        <PromoteStudentsForm
          onClose={() => setShowPromoteForm(false)}
          onSuccess={handlePromoteSuccess}
        />
      )}

      {transferTarget && (
        <TransferStudentForm
          student={transferTarget}
          onClose={() => setTransferTarget(null)}
          onSuccess={handleTransferSuccess}
        />
      )}
    </div>
  );
};

export default StudentsList;
