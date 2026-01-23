import React, { useEffect, useState, useCallback } from "react";
import type { Student } from "../../types";
import { getStudents } from "../../api";
import { StudentTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Load students from API (with backend search & pagination)
  const loadStudents = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getStudents({
        page,
        limit,
        sort: sortAsc ? "asc" : "desc",
        search: searchTerm, // send searchTerm to backend
      });

      setStudents(res.data);
      console.log("Loaded students:", res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load students:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  const { placeholder } = searchConfig.student;

  const handleEdit = (id: string, updatedData: Partial<Student>) => {
    console.log("Edit:", id, updatedData);
  };

  const handleDelete = (student: Student) => {
    console.log("Delete:", student);
  };

  const handleAddGuardian = () => {
    console.log("Add guardian");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Students</h1>

      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1); // reset to first page when searching
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading students...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <StudentTable
            students={students} // data already filtered & paginated from backend
            sortAsc={sortAsc}
            page={page}
            limit={limit}
            onSort={() => setSortAsc((prev) => !prev)}
            onAdd={handleAddGuardian}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            totalPages={totalPages} // use backend totalPages
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default StudentsList;
