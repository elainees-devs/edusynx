// client/src/pages/dashboard/principal.tsx
import PrincipalDashboardOverview from "../../components/dashboard/principal/dashboard-overview"
import { Sidebar, Topbar } from "../../shared/layout/dashboard"

const PrincipalDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="PRINCIPAL" />
            <Sidebar role="principal" />
            <PrincipalDashboardOverview />
            </div>
    )
}
export default PrincipalDashboard