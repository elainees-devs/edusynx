// client/src/shared/layout/dashboard/DashboardLayout.tsx
import type { ReactNode } from "react";
import { Sidebar, Topbar } from "./index";
import { cn } from "../../../utils";
import type { UserRole } from "../../../constants";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: UserRole | UserRole[];
  className?: string;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title,
  role,
  className,
}) => {
  // Convert UserRole(s) to string(s) for Sidebar
  const sidebarRole = Array.isArray(role)
    ? role.map((r) => (typeof r === "string" ? r : String(r)))
    : typeof role === "string"
      ? role
      : role
        ? String(role)
        : "";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role={sidebarRole} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar
          title={title}
          role={role as UserRole | UserRole[] | undefined}
        />

        {/* Page Content */}
        <main className={cn("p-4 md:p-6", className)}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
