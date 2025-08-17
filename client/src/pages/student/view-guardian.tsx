// client/src/page/student/view-guardian.tsx
import { GuardianList } from "../../components";
import { Sidebar, Topbar } from "../../shared";


const ViewGuardian: React.FC = () => {
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

        {/* Student List */}
        <div className="flex-1 overflow-auto p-4">
          <GuardianList />
      </div>
    </div>
    </div>
  );
};
export default ViewGuardian;
