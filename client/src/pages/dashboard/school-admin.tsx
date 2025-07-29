// src/pages/dashboard/school-admin.tsx
import { Sidebar, Topbar } from "../../shared/layout/dashboard"


const SchoolAdminDashBoard: React.FC = () =>{
    return(
        <div>
             <Topbar role="school-admin" />
            <Sidebar role="school-admin" />
            
        </div>
    )
}
export default SchoolAdminDashBoard