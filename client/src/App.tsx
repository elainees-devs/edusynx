// src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage, ResetPassword, SignIn, SignUp } from "./pages";
import {
  AccountantDashboard,
  GuardianDashboard,
  HeadTeacherDashboard,
  SchoolAdminDashboard,
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
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/headteacher" element={<HeadTeacherDashboard />} />
        <Route path="/guardian" element={<GuardianDashboard />} />
        <Route path="/accountant" element={<AccountantDashboard />} />
        <Route path="/school-admin" element={<SchoolAdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
