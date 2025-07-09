// client/src/pages/dashboard/super-admin.tsx
import SuperAdminDashboardOverView from "../../components/dashboard/super-admin/dashboard-overview"
import Sidebar from "../../shared/layout/dashboard/sidebar"
import Topbar from "../../shared/layout/dashboard/topbar"

const SuperAdminDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="Super Admin" />
            <Sidebar />
            <SuperAdminDashboardOverView />
           
        </div>
    )
}

export default SuperAdminDashboard