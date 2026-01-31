//client/src/components/data-list/class-list.tsx
import React, { useEffect, useState, useCallback } from "react";
import type { IClass} from "../../types";
import { deleteClass, getClasses, updateClass} from "../../api";
import { ClassTable } from "../data-table";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";


const ClassList: React.FC = () => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Load streams from API (with backend search & pagination)
  const loadClasses = useCallback(async () => {
    try {
      
      setLoading(true);
      const res = await getClasses({
        page,
        limit,
        sort: sortAsc ? "asc" : "desc",
        search: searchTerm, // send searchTerm to backend
      });

      setClasses(res.data);
      console.log("Loaded classes:", res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load classes:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm]);

  useEffect(() => {
    loadClasses();
  }, [loadClasses]);

  const { placeholder } = searchConfig.class;

   /* =========================
     EDIT CLASS
  ========================= */
  const handleEdit = async (id: string, data: Partial<IClass>) => {
    try {
      const updatedClass = await updateClass(id, data);

      setClasses((prev) =>
        prev.map((c) => (c._id === id ? updatedClass : c))
      );

      Swal.fire("Success", "Class updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  /* =========================
     DELETE CLASS
  ========================= */
  const handleDelete = async (clas: IClass) => {
    const result = await Swal.fire({
      title: "Delete class",
      text: `${clas.clasName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteClass(clas._id);

      setClasses((prev) =>
        prev.filter((c) => c._id !== clas._id)
      );

      Swal.fire("Deleted", "Class removed", "success");
    } catch  {
      Swal.fire("Error", "Delete failed", "error");
    }
  };


  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Class</h1>

      {/* Search */}
      <SearchBar
        placeholder={placeholder}
        value={searchTerm}
        onChange={(val) => {
          setSearchTerm(val);
          setPage(1); // reset to first page when searching
        }}
      />

      {loading ? (
        <div className="text-center py-6 text-gray-500">Loading classes...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <ClassTable
            classes={classes} // data already filtered & paginated from backend
            // sortAsc={sortAsc}
            page={page}
            limit={limit}
            onSort={() => setSortAsc((prev) => !prev)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <Pagination
            page={page}
            totalPages={totalPages} // use backend totalPages
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      )}
    </div>
  );
};

export default ClassList;
