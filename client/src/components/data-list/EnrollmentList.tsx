import React, { useEffect, useState, useCallback } from "react";
import EnrollmentTable from "../data-table/EnrollmentTable";
import { Pagination } from "../../shared";
import { getEnrollments, deleteEnrollment } from "../../api/EnrollmentApi";
import type { IEnrollment } from "../../types/academics/EnrollmentTypes";

interface Props {
  schoolId?: string;
  onEdit: (item: IEnrollment) => void;
  refreshKey?: number;
}

const EnrollmentList: React.FC<Props> = ({ schoolId, onEdit, refreshKey }) => {
  const [data, setData] = useState<IEnrollment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const limit = 10;

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const filters: Record<string, string> = {};
      if (schoolId) filters.school = schoolId;
      if (statusFilter) filters.status = statusFilter;
      const res = await getEnrollments(page, limit, filters);
      setData(res.data);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, schoolId, statusFilter]);

  useEffect(() => {
    fetch();
  }, [fetch, refreshKey]);

  const handleDelete = async (id: string) => {
    await deleteEnrollment(id);
    fetch();
  };

  if (loading) return <div className="text-center py-4 text-gray-500">Loading...</div>;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <label htmlFor="enrollment-status-filter" className="text-sm font-medium">Status:</label>
        <select
          id="enrollment-status-filter"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border rounded px-3 py-1.5 text-sm"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="transferred">Transferred</option>
          <option value="withdrawn">Withdrawn</option>
          <option value="graduated">Graduated</option>
        </select>
      </div>
      <p className="text-sm text-gray-600 mb-2">{total} enrollment(s) found</p>
      <EnrollmentTable data={data} onEdit={onEdit} onDelete={handleDelete} page={page} limit={limit} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default EnrollmentList;
