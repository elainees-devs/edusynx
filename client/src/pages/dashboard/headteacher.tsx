// client/src/pages/dashboard/headteacher.tsx
import Sidebar from "../../shared/layout/dashboard/sidebar"
import Topbar from "../../shared/layout/dashboard/topbar"


const HeadTeacherDashboard: React.FC = () =>{
    return(
        <div className="bg-gray">
            <Topbar role="Head Teacher" />
            <Sidebar />
            </div>
    )
}
export default HeadTeacherDashboard