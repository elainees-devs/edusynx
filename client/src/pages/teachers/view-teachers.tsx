// client/src/pages/teachers/ViewTeachers.tsx
import { TeacherList } from "../../components";
import { sampleTeachers } from "../../data/sampleTeachers";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";


const ViewTeachersPage = () => {
  const handleEdit = (teacherId: string) => {
    console.log("Edit teacher:", teacherId);
  };

  const handleToggle = (teacherId: string) => {
    console.log("Toggle status for:", teacherId);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="headteacher"/>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="headteacher" />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Teachers List</h1>
          <TeacherList
            teachers={sampleTeachers}
            onEdit={handleEdit}
            onToggleStatus={handleToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTeachersPage;
