// client/src/pages/dashboard/school-admin.tsx
import { SchoolAdminDashboardOverview } from "../../components";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";

const SchoolAdminDashBoard: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Topbar */}
      <Topbar role="school-admin" />

      {/* Main layout below topbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r h-full">
          <Sidebar role="school-admin" />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <SchoolAdminDashboardOverview />
        </main>
      </div>
    </div>
  );
};

export default SchoolAdminDashBoard;
