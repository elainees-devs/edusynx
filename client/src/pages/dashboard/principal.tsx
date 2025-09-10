// client/src/pages/dashboard/headteacher.tsx
import PrincipalDashboardOverview from "../../components/dashboard/principal/dashboard-overview"
import { Sidebar, Topbar } from "../../shared/layout/dashboard"

const PrincipalDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="Head Teacher" />
            <Sidebar role="headteacher" />
            <PrincipalDashboardOverview />
            </div>
    )
}
export default PrincipalDashboard