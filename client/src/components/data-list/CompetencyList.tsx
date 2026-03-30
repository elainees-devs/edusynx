import React, { useEffect, useState, useCallback } from "react";
import type { ICompetency } from "../../types";
import { getCompetencies, updateCompetency, deleteCompetency } from "../../api/CBCApi";
import CompetencyTable from "../data-table/CompetencyTable";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants/SearchConfig";
import Swal from "sweetalert2";

const CompetencyList: React.FC = () => {
  const [competencies, setCompetencies] = useState<ICompetency[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // const [sortAsc, setSortAsc] = useState(true); // Removed unused sortAsc
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Load competencies from API (with backend search & pagination)
  const loadCompetencies = useCallback(async () => {
    try {
      setLoading(true);
      // Note: If backend supports search/sort, pass them here
      const res = await getCompetencies(page, limit);
      setCompetencies(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Failed to load competencies:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    loadCompetencies();
  }, [loadCompetencies]);

  const { placeholder } = searchConfig.competency;

  // EDIT
  const handleEdit = async (id: string, data: Partial<ICompetency>) => {
    try {
      const updated = await updateCompetency(id, data);
      setCompetencies((prev) => prev.map((c) => (c._id === id ? updated : c)));
      Swal.fire("Success", "Competency updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  // DELETE
  const handleDelete = async (comp: ICompetency) => {
    const result = await Swal.fire({
      title: "Delete competency",
      text: `${comp.title}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      await deleteCompetency(comp._id);
      setCompetencies((prev) => prev.filter((c) => c._id !== comp._id));
      Swal.fire("Deleted", "Competency removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  // Simple client-side search (if backend search not available)
  const filtered = searchTerm
    ? competencies.filter((c) =>
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : competencies;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Competencies</h1>
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1);
        }}
      />
      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading competencies...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <CompetencyTable
            competencies={filtered}
            page={page}
            limit={limit}
            // onSort={() => setSortAsc((prev) => !prev)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default CompetencyList;
