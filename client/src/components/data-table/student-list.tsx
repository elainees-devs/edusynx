// client/src/components/data-table/student-list.tsx
import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";
import { getAllStudents } from "../../api/student.api";
import type { Student } from "../../types";


const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudents();
        setStudents(data);
      } catch (err) {
        setError("Failed to fetch students");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="p-4">Loading students...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Student List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">Adm No</th>
              <th className="px-4 py-2 border">First Name</th>
              <th className="px-4 py-2 border">MiddleName</th>
              <th className="px-4 py-2 border">Last Name</th>
              <th className="px-4 py-2 border">Gender</th>
               <th className="px-4 py-2 border">Previous School</th>
              <th className="px-4 py-2 border">Class</th>
              <th className="px-4 py-2 border">Stream</th>
              <th className="px-4 py-2 border">Guardian</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={student._id} className="hover:bg-gray-50 text-sm">
                <td className="px-4 py-2 border">{index + 1}</td>
                <td className="px-4 py-2 border">{student.adm}</td>
                <td className="px-4 py-2 border">{student.studentFirstName}</td>
                <td className="px-4 py-2 border">{student.studentMiddleName}</td>
                <td className="px-4 py-2 border">{student.studentLastName}</td>
                <td className="px-4 py-2 border">{student.studentGender}</td>
                <td className="px-4 py-2 border">{student.previousSchool}</td>
                <td className="px-4 py-2 border">{student.classId}</td>
                <td className="px-4 py-2 border">{student.stream}</td>
                
                <td className="px-4 py-2 border">{student.guardianId}</td>
                <td className="px-4 py-2 border flex gap-2">
                  <button title="Add Guardian">
                    <FaUserPlus className="text-blue-600 hover:text-blue-800" />
                  </button>
                  <button title="Edit Student">
                    <FaEdit className="text-green-600 hover:text-green-800" />
                  </button>
                  <button title="Delete Student">
                    <FaTrash className="text-red-600 hover:text-red-800" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsList;
