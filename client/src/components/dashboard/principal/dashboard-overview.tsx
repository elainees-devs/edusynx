import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaUserCheck,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import type {
  AttendanceAlert,
  FeeAlert,
  FinancialSummary,
} from "../../../constants/data/head-teacher-dashboard";

const tabs = ["Students", "Teachers", "Attendance", "Performance"];

const PrincipalDashboardOverview: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Students");
  const [filters, setFilters] = useState({
    class: "",
    stream: "",
    date: "",
  });

  const [finance, setFinance] = useState<FinancialSummary>({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });

  const [feeAlerts, setFeeAlerts] = useState<FeeAlert[]>([]);
  const [attendanceAlerts, setAttendanceAlerts] = useState<AttendanceAlert[]>([]);

  useEffect(() => {
    // Simulated API fetch
    setFinance({ totalIncome: 1200000, totalExpenses: 500000, netBalance: 700000 });
    setFeeAlerts([
      { studentName: "Jane Doe", className: "Grade 6", overdueAmount: 15000 },
      { studentName: "John Smith", className: "Grade 8", overdueAmount: 20000 },
    ]);
    setAttendanceAlerts([
      { studentName: "Mary Wambui", className: "Grade 5", attendanceRate: 68 },
      { studentName: "Ali Yusuf", className: "Grade 7", attendanceRate: 70 },
    ]);
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="ml-48 p-6 bg-gray-50 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Head Teacher Dashboard</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-4 rounded-2xl shadow">
        <select
          value={filters.class}
          onChange={(e) => handleFilterChange("class", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="">All Classes</option>
          <option value="Grade 5">Grade 5</option>
          <option value="Grade 6">Grade 6</option>
          <option value="Grade 7">Grade 7</option>
        </select>

        <select
          value={filters.stream}
          onChange={(e) => handleFilterChange("stream", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring focus:ring-blue-200"
        >
          <option value="">All Streams</option>
          <option value="North">North</option>
          <option value="South">South</option>
        </select>

        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`pb-2 text-lg font-medium ${
              activeTab === tab
                ? "border-b-4 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Students" && (
        <>
          {/* Financial Summary */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center gap-2 text-green-600">
                <FaMoneyBillWave className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Total Income</h2>
              </div>
              <p className="text-2xl font-bold mt-2">KES {finance.totalIncome.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center gap-2 text-red-500">
                <FaMoneyBillWave className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Total Expenses</h2>
              </div>
              <p className="text-2xl font-bold mt-2">KES {finance.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center gap-2 text-blue-600">
                <FaMoneyBillWave className="w-6 h-6" />
                <h2 className="text-lg font-semibold">Net Balance</h2>
              </div>
              <p className="text-2xl font-bold mt-2">KES {finance.netBalance.toLocaleString()}</p>
            </div>
          </section>

          {/* Alerts Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fee Alerts */}
            <div className="bg-white p-4 rounded-2xl shadow">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800 flex gap-2 items-center">
                  <FaExclamationTriangle className="text-yellow-500" />
                  Overdue Fees Alerts
                </h2>
                <MdNotificationsActive className="text-red-500 w-6 h-6" />
              </div>
              <ul className="mt-4 space-y-2">
                {feeAlerts.map((alert, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <span className="font-medium">{alert.studentName}</span> ({alert.className}) –{" "}
                    <span className="text-red-600">KES {alert.overdueAmount.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Attendance Alerts */}
            <div className=" bg-white p-4 rounded-2xl shadow">
              <h2 className="text-xl font-semibold text-gray-800 flex gap-2 items-center">
                <FaUserCheck className="text-indigo-600" />
                Low Attendance Alerts
              </h2>
              <ul className="mt-4 space-y-2">
                {attendanceAlerts.map((alert, idx) => (
                  <li key={idx} className="border-b pb-2">
                    <span className="font-medium">{alert.studentName}</span> ({alert.className}) –{" "}
                    <span className="text-orange-600">{alert.attendanceRate}%</span> attendance
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {activeTab === "Teachers" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 flex gap-2 items-center">
            <FaChalkboardTeacher className="text-purple-600" />
            Teachers Overview
          </h2>
          <p className="text-gray-600 mt-2">Coming soon — teacher attendance & subject load.</p>
        </div>
      )}

      {activeTab === "Attendance" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 flex gap-2 items-center">
            <FaUserCheck className="text-green-600" />
            Attendance Overview
          </h2>
          <p className="text-gray-600 mt-2">Graph/Charts to visualize attendance trends.</p>
        </div>
      )}

      {activeTab === "Performance" && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 flex gap-2 items-center">
            <FaUserGraduate className="text-blue-600" />
            Academic Performance
          </h2>
          <p className="text-gray-600 mt-2">Performance analytics by class or stream.</p>
        </div>
      )}
    </div>
  );
};

export default PrincipalDashboardOverview;
