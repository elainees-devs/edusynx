import SuperAdminDashboardOverView from "../../components/dashboard/super-admin/dashboard-overview"
import Sidebar from "../../shared/layout/dashboard/sidebar"
import Topbar from "../../shared/layout/dashboard/topbar"

const SuperAdminDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar />
            <Sidebar />
            <SuperAdminDashboardOverView />
           
        </div>
    )
}

export default SuperAdminDashboard