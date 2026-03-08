// client/src/shared/icon-button.tsx
import React from "react";
import { FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

type IconButtonType = "add" | "edit" | "delete";

interface IconButtonProps {
  title: string;
  type: IconButtonType;
  onClick?: () => void;
}

const iconMap: Record<IconButtonType, { icon: React.ReactNode; className: string }> = {
  add: { icon: <FaUserPlus />, className: "text-blue-600 hover:text-blue-800" },
  edit: { icon: <FaEdit />, className: "text-green-600 hover:text-green-800" },
  delete: { icon: <FaTrash />, className: "text-red-600 hover:text-red-800" },
};

const IconButton: React.FC<IconButtonProps> = ({ title, type, onClick }) => {
  const { icon, className } = iconMap[type];

  return (
    <button title={title} onClick={onClick} className={`p-1 rounded hover:bg-gray-100 ${className}`}>
      {icon}
    </button>
  );
};

export default IconButton;
