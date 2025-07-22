// client/src/shared/layout/dashboard/dashboard-layout.tsx
import { cn } from "../../../utils/cn";
import type { ReactNode } from "react";
import {Sidebar, Topbar} from "./index";

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  className?: string;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  role,
  className,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={role}/>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar title={title} role={role} />

        {/* Page Content */}
        <main className={cn("p-4 md:p-6", className)}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
