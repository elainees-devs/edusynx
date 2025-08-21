// client/src/components/data-list/guardian-list.tsx
import React from "react";
import { SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import { useGuardians } from "../../hooks/useGuardians";
import type { Guardian } from "../../types";
import { GuardianTable } from "../data-table";

const GuardianList: React.FC = () => {
  const {
    guardians,
    loading,
    error,
    sortAsc,
    searchTerm,
    setSearchTerm,
    handleSort,
  } = useGuardians();

  const { placeholder } = searchConfig.guardian;

  if (loading) return <div className="p-4">Loading guardians...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  const handleAddGuardian = () => {};
const handleEditGuardian = (guardian: Guardian) => {
  console.log("Edit guardian:", guardian);
};

const handleDeleteGuardian = (guardian: Guardian) => {
  console.log("Delete guardian:", guardian);
};



  return (
    <div className="mt-4 space-y-4">
      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={setSearchTerm}
      />

      {/* Table */}
      <GuardianTable
        guardians={guardians}
        sortAsc={sortAsc}
        onSort={handleSort}
        onAdd={handleAddGuardian}
        onEdit={handleEditGuardian}
        onDelete={handleDeleteGuardian}
      />
    </div>
  );
};

export default GuardianList;
