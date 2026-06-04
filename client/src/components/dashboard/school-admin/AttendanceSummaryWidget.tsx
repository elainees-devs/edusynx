import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { attendanceApi } from "../../../api/AttendanceApi";

const AttendanceSummaryWidget: React.FC = () => {
  const [summary, setSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const { data } = await attendanceApi.getAttendanceTrends(1);
        if (data && data.length > 0) {
          setSummary(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch widget data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <div className="bg-white p-4 rounded-xl border animate-pulse h-24" />;

  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex justify-between items-center transition-all hover:shadow-md hover:border-teal-200">
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Today's Attendance</p>
        <h2 className="text-2xl font-black text-teal-600">{summary?.averageRate.toFixed(1) || "0.0"}%</h2>
        <p className="text-[10px] text-gray-500">{summary?.totalRecords || 0} classes recorded</p>
      </div>
      <Link 
        to="/dashboard/attendance/analytics" 
        className="bg-teal-50 text-teal-700 p-2 rounded-lg hover:bg-teal-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      </Link>
    </div>
  );
};

export default AttendanceSummaryWidget;
