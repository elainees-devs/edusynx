//client/src/pages/teachers/view-teachers.tsx

import { TeacherList } from "../../components";

import { Sidebar, Topbar } from "../../shared/layout/dashboard";

const ViewTeachersPage = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="principal" />

        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Teachers List</h1>

          <TeacherList />
        </div>
      </div>
    </div>
  );
};

export default ViewTeachersPage;
