// client/src/shared/pagination.tsx
import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center mt-4 space-x-4">
      <button
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Previous
      </button>

      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        className="px-4 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
