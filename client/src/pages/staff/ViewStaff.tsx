import { StaffList } from "../../components";

import { Sidebar, Topbar } from "../../shared/layout/dashboard";

const ViewStaffPage = () => {
  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
        <Sidebar role="principal" />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar role="principal" />
        <div className="flex-1 overflow-y-auto p-4">
          <h1 className="text-xl font-bold mb-4">Staff List</h1>
          <StaffList />
        </div>
      </div>
    </div>
  );
};

export default ViewStaffPage;
