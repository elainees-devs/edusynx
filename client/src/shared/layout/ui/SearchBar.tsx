// client/src/shared/layout/ui/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <input
      type="text"
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-1/3 px-4 py-2 border-[0.5px]  border-grey-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
};

export default SearchBar;
