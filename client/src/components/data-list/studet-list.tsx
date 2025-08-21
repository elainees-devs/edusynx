// client/src/components/data-list/student-list.tsx
import React from "react";
import { SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import { useStudents } from "../../hooks/useStudents";
import { StudentTable } from "../data-table";



const StudentsList: React.FC = () => {
  const {
    students,
    loading,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
  } = useStudents();

  const { placeholder } = searchConfig.student;

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const handleAddStudent = () => {};
  const handleEditStudent = () => {
    console.log("Edit studet")
  };
  const handleDeleteStudent = () => {};

  return (
    <div className="mt-4 space-y-4">
      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Table */}
      <StudentTable
        students={students}
        sortAsc={sortAsc}
        onSort={handleSort}
        onAdd={handleAddStudent}
        onEdit={handleEditStudent}
        onDelete={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentsList;
