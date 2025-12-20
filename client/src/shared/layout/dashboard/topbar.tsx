// client/src/shared/layout/dashboard/topbar.tsx
import { NotificationButton, Profile } from "./top-bar";

type UserRole = "admin" | "principal" | "teacher" | "accountant";

interface TopbarProps {
  title?: string;
  role?: UserRole;
}

const getGreeting = (role?: unknown) => {
  if (typeof role !== "string") return "User";
  return role.charAt(0).toUpperCase() + role.slice(1);
};

const Topbar: React.FC<TopbarProps> = ({ title, role }) => {
  return (
    <header className="bg-white flex items-center justify-between px-6 py-4 shadow">
      <div className="ml-48">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-500 text-base">
          {getGreeting(role)}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <Profile />
      </div>
    </header>
  );
};

export default Topbar;
