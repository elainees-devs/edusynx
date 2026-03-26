import React, { useEffect, useState, useCallback } from "react";
import { Pagination } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";
import type { SubjectAssignment } from "../../types/school/Allocation";
// import { getSubjectAssignments, updateSubjectAssignment, deleteSubjectAssignment } from "../../api"; // Uncomment and implement these as needed

import SubjectAssignmentTable from "../data-table/SubjectAssignmentTable";

const SubjectAssignmentList: React.FC = () => {
  const [assignments, setAssignments] = useState<SubjectAssignment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Placeholder: load assignments (replace with real API call)
  const loadAssignments = useCallback(async () => {
    setLoading(true);
    // Replace with real API call
    // const res = await getSubjectAssignments({ page, limit, search: searchTerm });
    // setAssignments(res.data);
    // setTotalPages(res.totalPages);
    setTimeout(() => {
      setAssignments([
        {
          id: 1,
          subjectName: "Mathematics",
          teacher: { _id: "t1", firstName: "Alice", lastName: "Smith", middleName: "", primaryPhoneNumber: "", secondaryPhoneNumber: "", email: "alice@example.com", isActive: true, employmentNo: "EMP001" },
        },
        {
          id: 2,
          subjectName: "English",
          teacher: { _id: "t2", firstName: "Bob", lastName: "Brown", middleName: "", primaryPhoneNumber: "", secondaryPhoneNumber: "", email: "bob@example.com", isActive: true, employmentNo: "EMP002" },
        },
      ]);
      setTotalPages(1);
      setLoading(false);
    }, 500);
  }, [page, limit, searchTerm]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const { placeholder } = searchConfig.subject;

  // Placeholder edit handler
  const handleEdit = async () => {
    Swal.fire("Info", "Edit functionality not implemented.", "info");
  };

  // Placeholder delete handler
  const handleDelete = async (assignment: SubjectAssignment) => {
    const result = await Swal.fire({
      title: "Delete assignment?",
      text: `${assignment.subjectName} - ${assignment.teacher.firstName} ${assignment.teacher.lastName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    setAssignments((prev) => prev.filter((a) => a.id !== assignment.id));
    Swal.fire("Deleted", "Assignment removed", "success");
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Subject Assignments</h1>
      {/* Search */}
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        className="border p-2 rounded w-full max-w-md"
      />
      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading assignments...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <SubjectAssignmentTable
            assignments={assignments}
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

export default SubjectAssignmentList;
