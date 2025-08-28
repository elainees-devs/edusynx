// client/src/components/data-list/student-list.tsx
import React, { useState } from "react";
import { SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import { useStudents } from "../../hooks/useStudents";
import { StudentTable } from "../data-table";
import type { Student } from "../../types";
import { deleteStudent, updateStudent } from "../../api";

const StudentsList: React.FC = () => {
  const {
    students,
    loading,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
     setStudents,
  } = useStudents();

  //Local copy of students for updates
  const [localStudents, setLocalStudents] = useState<Student[]>(students);

  // Keep local in sync when hook updates
  React.useEffect(() => {
    setLocalStudents(students);
  }, [students]);

  const { placeholder } = searchConfig.student;

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const handleAddStudent = () => {
    // TODO: implement
  };

  const handleEditStudent = async (id: string, updatedData: Partial<Student>) => {
    try {
      const updatedStudent = await updateStudent(id, updatedData);
      console.log("Student updated:", updatedStudent);

      //Update local state so UI re-renders
      setLocalStudents((prev) =>
        prev.map((s) => (s._id === id ? updatedStudent : s))
      );
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };
const handleDeleteStudent = async (student: Student) => {
  if (!confirm(`Are you sure you want to delete ${student.studentFirstName}?`)) return;

  try {
    const res = await deleteStudent(student._id);
    console.log(res.message);

    // remove student from UI
    setStudents((prev) => prev.filter((s) => s._id !== student._id));
  } catch (error) {
    console.error("Error deleting student:", error);
  }
};


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
        students={localStudents}
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
