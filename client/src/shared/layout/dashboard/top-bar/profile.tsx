import { FaUserCircle } from "react-icons/fa";
import React from "react";

const Profile: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4">
      <FaUserCircle className="w-8 h-8 text-gray-500" />
    </div>
  );
};

export default Profile;

