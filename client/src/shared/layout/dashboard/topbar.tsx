// src/shared/layout/dashboard/topbar.tsx
import type { FC } from "react";

interface TopbarProps {
  title?: string;
}

const Topbar: FC<TopbarProps> = ({ title }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-white shadow">
      <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      {/* Additional topbar content (user menu, notifications, etc.) */}
    </header>
  );
};

export default Topbar;
