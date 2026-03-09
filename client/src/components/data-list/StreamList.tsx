//client/src/components/data-list/StreamList.tsx
import React, { useEffect, useState, useCallback } from "react";
import type { IStream } from "../../types";
import { deleteStream, getStreams, updateStream } from "../../api";
import { Pagination, SearchBar } from "../../shared";
import { searchConfig } from "../../constants";
import Swal from "sweetalert2";
import { StreamsTable } from "../data-table";

const StreamList: React.FC = () => {
  const [streams, setStreams] = useState<IStream[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(false);
  const limit = 10;

  // Load streams from API (with backend search & pagination)
  const loadStreams = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getStreams({
        page,
        limit,
        sort: sortAsc ? "asc" : "desc",
        search: searchTerm, // send searchTerm to backend
      });

      setStreams(res.data);
      console.log("Loaded streams:", res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to load streams:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, sortAsc, searchTerm]);

  useEffect(() => {
    loadStreams();
  }, [loadStreams]);

  const { placeholder } = searchConfig.stream;

  /* =========================
     EDIT STREAM
  ========================= */
  const handleEdit = async (id: string, data: Partial<IStream>) => {
    try {
      const updatedStream = await updateStream(id, data);

      setStreams((prev) => prev.map((s) => (s._id === id ? updatedStream : s)));

      Swal.fire("Success", "Stream updated", "success");
    } catch {
      Swal.fire("Error", "Update failed", "error");
    }
  };

  /* =========================
     DELETE STREAM
  ========================= */
  const handleDelete = async (stream: IStream) => {
    const result = await Swal.fire({
      title: "Delete stream",
      text: `${stream.streamName}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteStream(stream._id);

      setStreams((prev) => prev.filter((s) => s._id !== stream._id));

      Swal.fire("Deleted", "Stream removed", "success");
    } catch {
      Swal.fire("Error", "Delete failed", "error");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold">Streams</h1>

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
        <div className="text-center py-6 text-gray-500">Loading streams...</div>
      ) : (
        <div className="flex flex-col gap-4">
          <StreamsTable
            streams={streams} // data already filtered & paginated from backend
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

export default StreamList;
