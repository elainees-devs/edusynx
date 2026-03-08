// client/src/components/data-list/guardian-list.tsx
import React, { useCallback, useEffect, useState } from "react";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import type { Guardian } from "../../types";
import { GuardianTable } from "../data-table";
import Swal from "sweetalert2";
import { getGuardians, updateGuardian } from "../../api";

const GuardianList: React.FC = () => {
  const [guardians, setGuardians] = useState<Guardian[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const limit = 10;
  const { placeholder } = searchConfig.student;

  /* =========================
     LOAD GUARDIANS
  ========================= */
  const loadGuardians = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getGuardians({
        page,
        limit,
        sort: sortAsc ? "asc" : "desc",
        search: searchTerm,
      });

      setGuardians(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load guardians:", err);
      setError("Failed to load guardians");
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm]);

  useEffect(() => {
    loadGuardians();
  }, [loadGuardians]);

  /* =========================
     EDIT GUARDIAN
  ========================= */
  const handleEditGuardian = async (id: string, data: Partial<Guardian>) => {
    try {
      const updatedGuardian = await updateGuardian(id, data);

      setGuardians((prev) =>
        prev.map((g) => (g._id === id ? updatedGuardian : g))
      );

      Swal.fire("Success", "Guardian updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  const handleDeleteGuardian = (guardian: Guardian) => {
    console.log("Delete guardian:", guardian);
  };

  /* =========================
     RENDER
  ========================= */
  if (error) {
    return <div className="p-4 text-red-600">{error}</div>;
  }

  return (
    <div className="mt-4 space-y-4">
      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">
          Loading guardians...
        </div>
      ) : (
        <>
          {/* Table */}
          <GuardianTable
            guardians={guardians}
            onAdd={() => console.log("Add Guardian")}
            onEdit={handleEditGuardian}
            onDelete={handleDeleteGuardian}
            onSort={() => setSortAsc((prev) => !prev)}
            page={page}
            limit={limit}
          />

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default GuardianList;