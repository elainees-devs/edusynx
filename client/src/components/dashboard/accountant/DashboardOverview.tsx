import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
const chartColors = ["#2563EB", "#0F766E", "#FBBF24", "#6B7280"];


// Dummy Data
const kpi = {
  totalCollected: 12000,
  pendingPayments: 3500,
  studentsWithDues: 15,
  recentTransactions: 8,
};

const monthlyCollection = [
  { month: "Jan", collected: 2000 },
  { month: "Feb", collected: 2500 },
  { month: "Mar", collected: 1800 },
  { month: "Apr", collected: 3000 },
  { month: "May", collected: 2700 },
];

const paymentStatus = [
  { name: "Paid", value: 12000 },
  { name: "Pending", value: 3500 },
];

const feesPerClass = [
  { class: "Grade 1", amount: 2000 },
  { class: "Grade 2", amount: 3000 },
  { class: "Grade 3", amount: 4000 },
  { class: "Grade 4", amount: 2500 },
];

const recentTransactions = [
  { id: 1, student: "John Doe", amount: 500, date: "2026-02-01" },
  { id: 2, student: "Sarah Doe", amount: 700, date: "2026-02-02" },
  { id: 3, student: "Mike Smith", amount: 300, date: "2026-02-03" },
];

const AccountantDashboardOverview: React.FC = () => {
  return (
    <div className="ml-48 p-6 space-y-6 overflow-auto">
      <h1 className="text-3xl font-bold text-gray-800">Accountant Dashboard</h1>
      <p className="text-gray-600">Overview of school finances, collections & payments</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total Collected</p>
          <p className="text-3xl font-bold text-teal-700">${kpi.totalCollected}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Pending Payments</p>
          <p className="text-3xl font-bold text-red-500">${kpi.pendingPayments}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Students with Dues</p>
          <p className="text-3xl font-bold text-blue-600">{kpi.studentsWithDues}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Recent Transactions</p>
          <p className="text-3xl font-bold text-purple-600">{kpi.recentTransactions}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Monthly Collection Trend */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Monthly Collection</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyCollection}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="collected" stroke={chartColors[0]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Fees Per Class */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Fees per Class</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feesPerClass}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="class" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill={chartColors[1]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Status Pie */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-bold mb-2">Payment Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={paymentStatus} dataKey="value" nameKey="name" outerRadius={70} label>
                {paymentStatus.map((item, index) => (
                  <Cell key={index} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white shadow rounded-xl p-4">
        <h3 className="font-bold mb-4">Recent Transactions</h3>
        <ul className="space-y-3">
          {recentTransactions.map((tx) => (
            <li key={tx.id} className="border-b pb-2 flex justify-between text-gray-700">
              <span>{tx.student}</span>
              <span>${tx.amount}</span>
              <span>{tx.date}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AccountantDashboardOverview;