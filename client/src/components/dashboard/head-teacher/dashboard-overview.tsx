// client/src/components/dashboard/head-teacher/dashboard-overview.tsx
import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaExclamationTriangle, FaUserCheck } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";

interface FinancialSummary {
  totalIncome: number;
  totalExpenses: number;
  netBalance: number;
}

interface FeeAlert {
  studentName: string;
  className: string;
  overdueAmount: number;
}

interface AttendanceAlert {
  studentName: string;
  className: string;
  attendanceRate: number;
}

const PrincipalDashboard: React.FC = () => {
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

  return (
    <div className="ml-48 p-6 space-y-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Principal Dashboard</h1>

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
    </div>
  );
};

export default PrincipalDashboard;
