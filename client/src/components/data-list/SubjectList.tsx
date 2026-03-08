// client/src/components/data-list/subject-list.tsx
import React, { useEffect, useState, useCallback } from "react";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";
import type { ISubject } from "../../types";
import { deleteSubject, getSubjects, updateSubject } from "../../api";
import { SubjectTable } from "../data-table";


const SubjectList: React.FC = () => {
  const [subjects, setSubjects] = useState<ISubject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Load subjects from API with pagination and search
  const loadSubjects = useCallback(async () => {
    try {
      setLoading(true);

      const res = await getSubjects({
        page,
        limit,
        sort: "asc", // A→Z
        search: searchTerm,
      });

      setSubjects(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load subjects:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, searchTerm]);

  useEffect(() => {
    loadSubjects();
  }, [loadSubjects]);

  const { placeholder } = searchConfig.subject;

  /* =========================
     EDIT SUBJECT
  ========================= */
  const handleEdit = async (id: string, data: Partial<ISubject>) => {
      try {
        const updatedSubject = await updateSubject(id, data);
  
        setSubjects((prev) =>
          prev.map((s) => (s._id === id ? updatedSubject : s))
        );
  
        Swal.fire("Success", "Subject updated", "success");
      } catch{
        Swal.fire("Error", "Update failed", "error");
      }
    };

  /* =========================
     DELETE SUBJECT
  ========================= */
  const handleDelete = async (subject: ISubject) => {
    const result = await Swal.fire({
      title: "Delete subject?",
      text: `${subject.subjectName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteSubject(subject._id);
      setSubjects((prev) => prev.filter((s) => s._id !== subject._id));
      Swal.fire("Deleted", "Subject removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Subjects</h1>

      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1); // reset to first page on search
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading subjects...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <SubjectTable
            subjects={subjects} // already mapped to include school
            page={page}
            limit={limit}
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

export default SubjectList;
