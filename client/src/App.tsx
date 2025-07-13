// client/src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  ResetPassword,
  SignIn,
  SchoolRegistrationPage,
  SignUp,
  Schools,
  SuperAdminSignUp,
} from "./pages";
import {
  AccountantDashboard,
  GuardianDashboard,
  HeadTeacherDashboard,
  SchoolAdminDashboard,
  SuperAdminDashboard,
  TeacherDashboard,
} from "./pages/dashboard/";
import GlobalStateProvider from "./context/global/useGlobalState";


function App() {
  return (
   
<GlobalStateProvider>
      <Router>
        <Routes>
          {/* Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug/signin" element={<SignIn />} />
          <Route path="/:slug/signup" element={<SignUp />} />
          <Route path="/signup/super-admin" element={<SuperAdminSignUp />} />
          <Route path="/register" element={<SchoolRegistrationPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Dashboards */}
          <Route path="/:slug/dashboard/teacher" element={<TeacherDashboard />} />
          <Route
            path="/:slug/dashboard/headteacher"
            element={<HeadTeacherDashboard />}
          />
          <Route path="/:slug/dashboard/guardian" element={<GuardianDashboard />} />
          <Route
            path="/:slug/dashboard/accountant"
            element={<AccountantDashboard />}
          />
          <Route
            path="/:slug/dashboard/school-admin"
            element={<SchoolAdminDashboard />}
          />
          <Route
            path="/dashboard/super-admin"
            element={<SuperAdminDashboard />}
          />
            <Route
            path="/dashboard/schools"
            element={<Schools />}
          />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
