import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  Legend,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import { attendanceApi } from "../../api/AttendanceApi";
import { useClassOptions } from "../../hooks/useClassOptions";

const COLORS = ["#319795", "#008eab", "#3280b7", "#6c6daf", "#e53e3e"];

const AttendanceAnalytics: React.FC = () => {
  const { classOptions, streamOptions } = useClassOptions();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStream, setSelectedStream] = useState("");
  const [trends, setTrends] = useState<any[]>([]);
  const [atRisk, setAtRisk] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGlobalStats();
  }, []);

  useEffect(() => {
    if (selectedClass && selectedStream) {
      fetchClassData();
    }
  }, [selectedClass, selectedStream]);

  const fetchGlobalStats = async () => {
    try {
      const { data } = await attendanceApi.getAttendanceTrends(30);
      setTrends(data.map((d: any) => ({ ...d, date: d._id })));
      
      const { data: atRiskData } = await attendanceApi.getAtRiskStudents(80);
      setAtRisk(atRiskData);
    } catch (err) {
      console.error("Error fetching global stats:", err);
    }
  };

  const fetchClassData = async () => {
    setLoading(true);
    try {
      const { data } = await attendanceApi.getClassAnalytics(selectedClass, selectedStream);
      setStats(data);
    } catch (err) {
      console.error("Error fetching class analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  const statusDistribution = stats ? [
    { name: 'Present', value: stats.summary.present },
    { name: 'Absent', value: stats.summary.absent },
    { name: 'Late', value: stats.summary.late },
    { name: 'Excused', value: stats.summary.excused },
  ] : [];

  return (
    <div className="ml-48 p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Attendance Analytics</h1>
          <p className="text-gray-500">Insights, trends, and at-risk student monitoring</p>
        </div>
      </div>

      {/* Selectors */}
      <div className="bg-white p-4 rounded-xl border flex gap-4 items-end shadow-sm">
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Stream</label>
          <select 
            value={selectedStream}
            onChange={(e) => setSelectedStream(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Stream</option>
            {streamOptions.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Class</label>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full border p-2 rounded-lg text-sm focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Class</option>
            {classOptions.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <button 
          onClick={fetchClassData}
          disabled={!selectedClass || !selectedStream}
          className="bg-teal-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-teal-700 disabled:opacity-50"
        >
          Generate Report
        </button>
      </div>

      {/* Top Row: Global Trends & At Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-bold text-gray-700 mb-4">30-Day Attendance Trend (%)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={10} tickFormatter={(str) => str.split('-').slice(1).join('/')} />
                <YAxis domain={[0, 100]} fontSize={10} />
                <Tooltip />
                <Line type="monotone" dataKey="averageRate" stroke="#319795" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* At Risk Students */}
        <div className="bg-white p-6 rounded-xl border shadow-sm overflow-hidden">
          <h3 className="text-lg font-bold text-gray-700 mb-4">At-Risk Students (Below 80%)</h3>
          <div className="overflow-y-auto max-h-[300px]">
            <table className="w-full text-left">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="p-2 text-xs font-bold text-gray-500">Student</th>
                  <th className="p-2 text-xs font-bold text-gray-500 text-center">Rate</th>
                  <th className="p-2 text-xs font-bold text-gray-500 text-center">Absences</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {atRisk.length > 0 ? atRisk.map((item, idx) => (
                  <tr key={idx} className="hover:bg-red-50 transition-colors">
                    <td className="p-3 text-sm font-medium">
                      {item.studentId.studentFirstName} {item.studentId.studentLastName}
                    </td>
                    <td className="p-3 text-sm text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        item.attendanceRate < 50 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {item.attendanceRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="p-3 text-sm text-center font-bold text-gray-600">
                      {item.absentCount}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="p-10 text-center text-gray-400 italic">No students currently at risk.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Selected Class Detail */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {/* Summary Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-6 rounded-xl border shadow-sm border-l-4 border-l-teal-500">
              <p className="text-sm text-gray-400 font-bold uppercase">Average Attendance</p>
              <h2 className="text-4xl font-black text-teal-600">{stats.averageRate.toFixed(1)}%</h2>
            </div>
            <div className="bg-white p-6 rounded-xl border shadow-sm">
              <h3 className="text-sm font-bold text-gray-700 mb-4 uppercase">Status Distribution</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Student Rankings in Class */}
          <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Class Performance Ranking</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={[...stats.students].sort((a,b) => b.attendanceRate - a.attendanceRate).slice(0, 10)}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis 
                    dataKey="studentId.studentLastName" 
                    type="category" 
                    width={100} 
                    fontSize={12}
                  />
                  <Tooltip />
                  <Bar dataKey="attendanceRate" fill="#3280b7" radius={[0, 4, 4, 0]}>
                    {stats.students.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.attendanceRate < 80 ? '#e53e3e' : '#319795'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceAnalytics;
