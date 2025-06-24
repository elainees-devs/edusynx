// client/src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, ResetPassword, SignIn, SignUp } from "./pages";
import {
  AccountantDashboard,
  GuardianDashboard,
  HeadTeacherDashboard,
  SchoolAdminDashboard,
  SuperAdminDashboard,
  TeacherDashboard,
} from "./pages/dashboard/";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Dashboards */}
        <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
        <Route path="/dashboard/headteacher" element={<HeadTeacherDashboard />} />
        <Route path="/dashboard/guardian" element={<GuardianDashboard />} />
        <Route path="/dashboard/accountant" element={<AccountantDashboard />} />
        <Route path="/dashboard/school-admin" element={<SchoolAdminDashboard />} />
           <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
