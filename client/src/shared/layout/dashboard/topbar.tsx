// client/src/shared/layout/dashboard/topbar.tsx
import { NotificationButton,Profile } from "./top-bar";
interface TopbarProps {
  title?: string;
  role: 'admin' | 'headteacher' | 'teacher' | 'accountant' | string;
}

const Topbar: React.FC<TopbarProps> = ({ title, role }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    let greeting = "Good evening";

    if (hour < 12) {
      greeting = "Good morning";
    } else if (hour < 18) {
      greeting = "Good afternoon";
    }

    const formattedRole = role.charAt(0).toUpperCase() + role.slice(1);

    return (
      <>
        {greeting},{" "}
        <span className="text-teal-400 font-medium">{formattedRole}</span>
      </>
    );
  };

  return (
    <header className="bg-white flex items-center justify-between px-6 py-4 shadow">
      <div className="ml-48">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <h2 className="text-gray-500 text-base">{getGreeting()}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <Profile />
      </div>
    </header>
  );
};

export default Topbar;
