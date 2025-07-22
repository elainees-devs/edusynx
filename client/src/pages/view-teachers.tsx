// client/src/pages/ViewTeachers.tsx

import { ViewTeachersDetails } from "../components";
import { sampleTeachers } from "../data/sampleTeachers";
import Sidebar from "../shared/layout/dashboard/sidebar";
import Topbar from "../shared/layout/dashboard/topbar";

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
        <Sidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="Head Teacher" />
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Teachers List</h1>
          <ViewTeachersDetails
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
