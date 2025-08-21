// client/src/pages/class/ClassOverView.tsx
import React from "react";
import { ClassOverviewList } from "../../components";
import { Sidebar, Topbar } from "../../shared";

const ClassOverView: React.FC = () => {

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 bg-gray-100 overflow-y-auto">
       <Sidebar role={["school-admin", "head-teacher"]} />

      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Topbar */}
        <div className="flex-shrink-0">
          <Topbar role="school-admin" />
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-auto p-4">
          <ClassOverviewList />
        </div>
      </div>
    </div>
  );
};

export default ClassOverView;
