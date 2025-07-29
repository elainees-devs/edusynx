// client/src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignIn,
  SchoolRegistrationPage,
  SignUp,
  Schools,
  SuperAdminSignUp,
  ResetPassword,
  SuperAdminSignIn,
  NewPassword,
  RegisterClass,
  ViewClass,
  RegisterStream,
  ViewTeachers,
  Logout,
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
import ClassTeacher from "./pages/allocation/class-teacher";

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Routes>
          {/* === Public / Authentication / Home === */}
          <Route path="/" element={<HomePage />} />
          <Route path="/:slug/sign-in" element={<SignIn />} />
          <Route path="/:slug/sign-up" element={<SignUp />} />
          <Route path="/super-admin/sign-up" element={<SuperAdminSignUp />} />
          <Route path="/super-admin/sign-in" element={<SuperAdminSignIn />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register-school" element={<SchoolRegistrationPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />

          {/* === Dashboards === */}
          <Route path="/:slug/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/:slug/dashboard/head-teacher" element={<HeadTeacherDashboard />} />
          <Route path="/:slug/dashboard/guardian" element={<GuardianDashboard />} />
          <Route path="/:slug/dashboard/accountant" element={<AccountantDashboard />} />
          <Route path="/:slug/dashboard/school-admin" element={<SchoolAdminDashboard />} />
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/schools" element={<Schools />} />

          {/* === Classes === */}
          <Route path="/head-teacher/class/new" element={<RegisterClass />} />
          <Route path="/:slug/classes" element={<ViewClass />} />

          {/* === Streams === */}
          <Route path="/head-teacher/streams/new" element={<RegisterStream />} />

          {/* === Head Teacher submenus === */}
          <Route path="/:slug/head-teacher/teachers" element={<ViewTeachers />} />

          {/* === Allocation === */}
          <Route path="/:slug/allocation/class-teacher" element={<ClassTeacher />} />
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
