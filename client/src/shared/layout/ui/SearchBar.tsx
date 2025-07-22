import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange,
  onSearch,
}) => {
  return (
    <div className="flex items-center w-full md:w-1/2 rounded-full border border-teal-400 overflow-hidden shadow-sm">
      {/* Search Icon */}
      <div className="pl-4 text-teal-500">
        <FaSearch className="w-4 h-4" />
      </div>

      {/* Input */}
      <input
        type="text"
        placeholder={placeholder || "Search by first name..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 focus:outline-none text-sm"
      />

      {/* Search Button */}
      <button
        type="button"
        onClick={onSearch}
        className="bg-teal-400 text-white px-4 py-2 text-sm font-medium hover:bg-teal-500 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
