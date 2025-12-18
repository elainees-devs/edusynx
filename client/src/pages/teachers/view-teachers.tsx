import { useState } from "react";
import { TeacherList } from "../../components";
import { sampleTeachers } from "../../data/sampleTeachers";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";

const ViewTeachersPage = () => {
  const [teachers, setTeachers] = useState(sampleTeachers);

  const handleEdit = (teacherId: string) => {
    console.log("Edit teacher:", teacherId);
  };

  const handleToggle = (teacherId: string) => {
    setTeachers(prev =>
      prev.map(teacher =>
        teacher.id === teacherId
          ? { ...teacher, isActive: !teacher.isActive }
          : teacher
      )
    );
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="headteacher" />

        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Teachers List</h1>
          <TeacherList
            teachers={teachers}
            onEdit={handleEdit}
            onToggleStatus={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTeachersPage;
