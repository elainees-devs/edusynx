import React, { useEffect, useState, useCallback } from "react";
import AcademicYearTable from "../data-table/AcademicYearTable";
import { Pagination } from "../../shared";
import { getAcademicYears, deleteAcademicYear } from "../../api/AcademicYearApi";
import type { IAcademicYear } from "../../types/school/AcademicYearTypes";

interface Props {
  schoolId: string;
  onEdit: (item: IAcademicYear) => void;
  refreshKey?: number;
}

const AcademicYearList: React.FC<Props> = ({ schoolId, onEdit, refreshKey }) => {
  const [data, setData] = useState<IAcademicYear[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const limit = 10;

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAcademicYears(page, limit, schoolId);
      setData(res.data);
      setTotalPages(res.totalPages);
      setTotal(res.total);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [page, schoolId]);

  useEffect(() => {
    fetch();
  }, [fetch, refreshKey]);

  const handleDelete = async (id: string) => {
    await deleteAcademicYear(id);
    fetch();
  };

  if (loading) return <div className="text-center py-4 text-gray-500">Loading...</div>;

  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">{total} academic year(s) found</p>
      <AcademicYearTable data={data} onEdit={onEdit} onDelete={handleDelete} page={page} limit={limit} />
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default AcademicYearList;
