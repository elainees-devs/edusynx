// client/src/pages/dashboard/super-admin.tsx
import SuperAdminDashboardOverView from "../../components/dashboard/super-admin/DashboardOverview"
import { Sidebar, Topbar } from "../../shared"

const SuperAdminDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="super-admin" />
            <Sidebar role="super-admin" />
            <SuperAdminDashboardOverView />
           
        </div>
    )
}

export default SuperAdminDashboard