import type { SubjectAssignment } from "../../types/school/Allocation";

const SubjectAssignmentTable = ({
  assignments,
  onEdit,
  onDelete,
  page,
  limit,
}: {
  assignments: SubjectAssignment[];
  onEdit: (id: number, data: Partial<SubjectAssignment>) => void;
  onDelete: (assignment: SubjectAssignment) => void;
  page: number;
  limit: number;
}) => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr className="text-left text-sm font-semibold text-gray-700">
          <th className="px-4 py-2 border">#</th>
          <th className="px-4 py-2 border">Subject</th>
          <th className="px-4 py-2 border">Teacher</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment, idx) => (
          <tr key={assignment.id} className="hover:bg-gray-50 text-sm">
            <td className="px-4 py-2 border">{(page - 1) * limit + idx + 1}</td>
            <td className="px-4 py-2 border">{assignment.subjectName}</td>
            <td className="px-4 py-2 border">{`${assignment.teacher.firstName} ${assignment.teacher.lastName}`}</td>
            <td className="px-4 py-2 border flex gap-2">
              <button onClick={() => onEdit(assignment.id, {})} className="text-green-600 hover:text-green-800">Edit</button>
              <button onClick={() => onDelete(assignment)} className="text-red-600 hover:text-red-800">Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default SubjectAssignmentTable;
