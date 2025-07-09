// src/shared/layout/dashboard/topbar.tsx

import NotificationButton from "./top-bar/notification";
import Profile from "./top-bar/profile";

interface TopbarProps {
  title?: string;
}

const Topbar: React.FC<TopbarProps> = ({ title }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <header className="bg-white flex items-center justify-between px-6 py-3 shadow">
      <div className="ml-48">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-500">{getGreeting()}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <Profile />
      </div>
    </header>
  );
};

export default Topbar;
