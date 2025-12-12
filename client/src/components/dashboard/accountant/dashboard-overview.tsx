import React from "react";


type CardProps = {
  title: string;
  value: string;
  delta?: string; // percentage change text
  icon?: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title, value, delta, icon }) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl p-4 flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-sm text-gray-500">{title}</div>
        <div className="text-2xl font-semibold text-gray-800">{value}</div>
        {delta && <div className="text-xs text-green-600 mt-1">{delta}</div>}
      </div>
    </div>
  );
};

// Simple inline sparkline (SVG) — replace with chart library if desired
const Sparkline: React.FC<{ data: number[] }> = ({ data }) => {
  const max = Math.max(...data);
  const points = data
    .map((d, i) => `${(i / (data.length - 1)) * 100},${100 - (d / max) * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="w-full h-20">
      <polyline
        fill="none"
        stroke="#4f46e5"
        strokeWidth={1.5}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// Mock data types
type StudentBalance = {
  id: string;
  name: string;
  className: string;
  amountDue: number;
  lastPayment: string; // ISO date
  parentPhone: string;
  status: "Pending" | "Cleared" | "Partial";
};

const MOCK_STUDENTS: StudentBalance[] = [
  {
    id: "s1",
    name: "John Doe",
    className: "Grade 7",
    amountDue: 3200,
    lastPayment: "2025-12-02",
    parentPhone: "0712 345678",
    status: "Pending",
  },
  {
    id: "s2",
    name: "Mary Kamau",
    className: "Form 2",
    amountDue: 0,
    lastPayment: "2025-11-28",
    parentPhone: "0790 112233",
    status: "Cleared",
  },
  {
    id: "s3",
    name: "Brian O.",
    className: "Grade 8",
    amountDue: 9500,
    lastPayment: "2025-12-01",
    parentPhone: "0722 445566",
    status: "Partial",
  },
];

const formatKES = (n: number) => `KES ${n.toLocaleString()}`;

const AccountantDashboard: React.FC = () => {
  // Replace these with hooks that fetch from your API
  const totalFeesCollected = 1250000;
  const outstandingBalances = 45200;
  const expensesThisMonth = 230000;
  const netBalance = totalFeesCollected - expensesThisMonth;

  const feesTrend = [80000, 95000, 120000, 90000, 150000, 125000];

  // Actions (stubbed)
  const handleSendReminder = (student: StudentBalance) => {
    // TODO: call API to send SMS/email
    alert(`Reminder sent to ${student.name} (${student.parentPhone})`);
  };

  const handleGenerateInvoice = (student: StudentBalance) => {
    // TODO: open invoice modal or navigate to invoice creation
    alert(`Generate invoice for ${student.name}`);
  };

  const handleRecordPayment = (student: StudentBalance) => {
    // TODO: open payment modal
    alert(`Record payment for ${student.name}`);
  };

  return (
    <div className="p-6 space-y-8 min-h-screen bg-gray-50">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Accountant Dashboard</h1>
          <p className="text-sm text-gray-500">Financial insights and summaries</p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Range</label>
          <select className="rounded-lg border px-3 py-2 bg-white text-sm">
            <option>This Month</option>
            <option>Term</option>
            <option>This Year</option>
          </select>
        </div>
      </header>

      {/* Top cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          title="Total Fees Collected"
          value={formatKES(totalFeesCollected)}
          delta="+8.2% vs last period"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-3.866 0-7 1.79-7 4v4h14v-4c0-2.21-3.134-4-7-4z"/></svg>}
        />

        <Card
          title="Outstanding Balances"
          value={formatKES(outstandingBalances)}
          delta="-2.1% vs last period"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"/></svg>}
        />

        <Card
          title="Expenses This Month"
          value={formatKES(expensesThisMonth)}
          delta="+3.4% vs last period"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6M9 8h6v6"/></svg>}
        />
      </section>

      {/* Charts + balances */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Monthly Fees Collection</h2>
            <div className="text-sm text-gray-500">Total: {formatKES(totalFeesCollected)}</div>
          </div>
          <Sparkline data={feesTrend} />
          <div className="mt-3 text-sm text-gray-600">Payment modes: M-Pesa 60% • Bank 30% • Cash 10%</div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-sm text-gray-500">Net Balance</h3>
          <div className="text-2xl font-semibold text-gray-800 mt-2">{formatKES(netBalance)}</div>
          <div className="mt-4 text-sm text-gray-600">Bank: {formatKES(800000)} • Cash: {formatKES(netBalance - 800000)}</div>
        </div>
      </section>

      {/* Student Balances table */}
      <section className="bg-white rounded-2xl shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Student Balances</h2>
          <div className="flex items-center gap-2">
            <input className="border rounded-lg px-3 py-2 text-sm" placeholder="Search student or class" />
            <button className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm">Filter</button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-2">Student</th>
                <th className="py-2">Class</th>
                <th className="py-2">Amount Due</th>
                <th className="py-2">Last Payment</th>
                <th className="py-2">Parent</th>
                <th className="py-2">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STUDENTS.map((s) => (
                <tr key={s.id} className="border-b last:border-b-0 hover:bg-gray-50">
                  <td className="py-3">{s.name}</td>
                  <td className="py-3">{s.className}</td>
                  <td className="py-3">{formatKES(s.amountDue)}</td>
                  <td className="py-3">{s.lastPayment}</td>
                  <td className="py-3">{s.parentPhone}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.status === "Cleared"
                          ? "bg-green-100 text-green-700"
                          : s.status === "Pending"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSendReminder(s)}
                        className="text-xs px-2 py-1 rounded-md border"
                      >
                        Send Reminder
                      </button>
                      <button
                        onClick={() => handleGenerateInvoice(s)}
                        className="text-xs px-2 py-1 rounded-md bg-indigo-600 text-white"
                      >
                        Invoice
                      </button>
                      <button
                        onClick={() => handleRecordPayment(s)}
                        className="text-xs px-2 py-1 rounded-md border"
                      >
                        Record
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Expenses + Recent invoices */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800">Expenses Overview</h3>
          <div className="mt-4 text-sm text-gray-600">Salaries • Utilities • Repairs • Supplies</div>

          <ul className="mt-4 space-y-3">
            <li className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Salaries</div>
                <div className="text-xs text-gray-500">Monthly payroll</div>
              </div>
              <div className="text-sm font-semibold">{formatKES(150000)}</div>
            </li>

            <li className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-gray-800">Utilities</div>
                <div className="text-xs text-gray-500">Water & Electricity</div>
              </div>
              <div className="text-sm font-semibold">{formatKES(22000)}</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Invoices</h3>
          <div className="mt-4 space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <div>INV-1092 — Brian</div>
              <div className="font-medium">{formatKES(9500)}</div>
            </div>
            <div className="flex justify-between">
              <div>INV-1091 — John</div>
              <div className="font-medium">{formatKES(3200)}</div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button className="px-4 py-2 rounded-lg border">Export CSV</button>
          </div>
        </div>
      </section>

      {/* Footer actions */}
      <div className="flex justify-end gap-3">
        <button className="px-4 py-2 rounded-lg border">Settings</button>
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white">Create Invoice</button>
      </div>
    </div>
  );
};

export default AccountantDashboard;
