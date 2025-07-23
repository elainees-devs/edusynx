// client/src/pages/dashboard/headteacher.tsx
import PrincipalDashboard from "../../components/dashboard/head-teacher/dashboard-overview"
import { Sidebar, Topbar } from "../../shared/layout/dashboard"

const HeadTeacherDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="Head Teacher" />
            <Sidebar role="headteacher" />
            <PrincipalDashboard />
            </div>
    )
}
export default HeadTeacherDashboard