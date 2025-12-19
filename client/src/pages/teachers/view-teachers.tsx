//client/src/pages/teachers/view-teachers.tsx
import { useState } from "react";
import { TeacherList } from "../../components";
import { sampleTeachers } from "../../data/sampleTeachers";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import type { Teacher } from "../../types/school/allocation";

const ViewTeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(sampleTeachers);

  /* inline edit state */
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Teacher>>({});

  /* ===================== handlers ===================== */

  // Toggle active / inactive
  const handleToggleStatus = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === teacherId
          ? { ...teacher, isActive: !teacher.isActive }
          : teacher
      )
    );
  };

  // Start inline edit
  const handleEditStart = (teacher: Teacher) => {
    setEditingId(teacher.id);
    setEditData(teacher);
  };

  // Change inline field
  const handleEditChange = (
    field: keyof Teacher,
    value: string
  ) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save inline edit
  const handleEditSave = (teacherId: string) => {
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === teacherId
          ? { ...teacher, ...editData }
          : teacher
      )
    );

    setEditingId(null);
    setEditData({});
  };

  // Cancel inline edit
  const handleEditCancel = () => {
    setEditingId(null);
    setEditData({});
  };

  // Delete teacher
  const handleDelete = (teacherId: string) => {
    if (!confirm("Are you sure you want to delete this teacher?")) return;

    setTeachers((prev) =>
      prev.filter((teacher) => teacher.id !== teacherId)
    );
  };

  /* ===================== render ===================== */

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="headteacher" />

        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Teachers List</h1>

          <TeacherList
            teachers={teachers}
            editingId={editingId}
            editData={editData}
            onEditStart={handleEditStart}
            onEditChange={handleEditChange}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTeachersPage;
