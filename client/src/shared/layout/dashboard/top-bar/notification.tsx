// client/src/shared/layout/dashboard/top-bar/notification.tsx
import { FaBell } from "react-icons/fa";
import { useState } from "react";

const NotificationButton: React.FC = () => {
  const [unreadCount, setUnreadCount] = useState(3); 

  const handleClick = () => {
    setUnreadCount(0);
    // Trigger dropdown or modal here
  };

  return (
    <div className="relative group">
      <button
        onClick={handleClick}
        className="relative p-3 rounded-full shadow hover:bg-gray-100 transition"
      >
        <FaBell className="h-5 w-5 text-gray-700" />

        {unreadCount > 0 && (
          <>
            {/* Red dot ping animation */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            {/* Solid red dot */}
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            {/* Tooltip container */}
            <div className="absolute -top-2 left-10 w-max bg-black text-white text-xs px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
              {unreadCount} unread message{unreadCount > 1 ? "s" : ""}
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default NotificationButton;
