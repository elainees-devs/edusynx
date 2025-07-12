// client/src/pages/dashboard/headteacher.tsx
import PrincipalDashboard from "../../components/dashboard/head-teacher/dashboard-overview"
import Sidebar from "../../shared/layout/dashboard/sidebar"
import Topbar from "../../shared/layout/dashboard/topbar"


const HeadTeacherDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="Head Teacher" />
            <Sidebar />
            <PrincipalDashboard />
            </div>
    )
}
export default HeadTeacherDashboard