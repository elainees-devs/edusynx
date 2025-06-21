// src/shared/layout/dashboard/dashboard-layout.tsx

import { cn } from "../../../utils/cn";
import Sidebar from "./sidebar";
import Topbar from "./topbar";
import type { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  className,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar title={title} />

        {/* Page Content */}
        <main className={cn("p-4 md:p-6", className)}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
