
import { TeacherDashboardOverview } from "../../components"
import { Sidebar, Topbar } from "../../shared/layout/dashboard"

const TeacherDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="teacher" />
            <Sidebar role="teacher" />
            <TeacherDashboardOverview />
            </div>
    )
}
export default TeacherDashboard