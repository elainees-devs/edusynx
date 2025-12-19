// src/pages/dashboard/accountant.tsx
import { AccountantDashboardOverview } from "../../components";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";

const AccountantDashboard: React.FC = () => {
  return (
    <div className="bg-gray">
      <Topbar role="ACCOUNTANT" />
      <Sidebar role="accountant" />
      <AccountantDashboardOverview />
    </div>
  );
};
export default AccountantDashboard;
