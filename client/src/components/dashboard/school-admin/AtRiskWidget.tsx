import React, { useEffect, useState } from "react";
import { attendanceApi } from "../../../api/AttendanceApi";
import { Link } from "react-router-dom";

const AtRiskWidget: React.FC = () => {
  const [atRisk, setAtRisk] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtRisk = async () => {
      try {
        const { data } = await attendanceApi.getAtRiskStudents(75);
        setAtRisk(data.slice(0, 5));
      } catch (err) {
        console.error("Failed to fetch at-risk widget data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAtRisk();
  }, []);

  if (loading) return <div className="bg-white p-4 rounded-xl border animate-pulse h-40" />;

  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm border-l-4 border-l-red-500">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-bold text-gray-700 uppercase">Attention Required</h3>
        <Link to="/dashboard/attendance/analytics" className="text-[10px] text-blue-600 hover:underline">View All</Link>
      </div>
      
      {atRisk.length > 0 ? (
        <div className="space-y-2">
          {atRisk.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs">
              <span className="text-gray-600 truncate mr-2">
                {item.studentId.studentLastName} {item.studentId.studentFirstName.charAt(0)}.
              </span>
              <span className="font-bold text-red-600 bg-red-50 px-1 rounded">
                {item.attendanceRate.toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[10px] text-gray-400 italic py-4 text-center">No students under 75% attendance.</p>
      )}
    </div>
  );
};

export default AtRiskWidget;
