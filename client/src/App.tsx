// client/src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  HomePage,
  SignIn,
  SchoolSignupPage,
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
  RegisterStudent,
  ViewStudents,
  ViewGuardian,
} from "./pages";
import {
  AccountantDashboard,
  GuardianDashboard,
  PrincipalDashboard,
  SchoolAdminDashboard,
  SuperAdminDashboard,
  TeacherDashboard,
} from "./pages/dashboard/";
import GlobalStateProvider from "./context/global/useGlobalState";
// import ClassTeacher from "./pages/allocation/class-teacher";
import ClassOverView from "./pages/class/class-overview";

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
          <Route path="/signup-school" element={<SchoolSignupPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/new-password" element={<NewPassword />} />

          {/* === Dashboards === */}
          <Route
            path="/:slug/dashboard/teacher"
            element={<TeacherDashboard />}
          />
          <Route
            path="/:slug/dashboard/principal"
            element={<PrincipalDashboard />}
          />
          <Route
            path="/:slug/dashboard/guardian"
            element={<GuardianDashboard />}
          />
          <Route
            path="/:slug/dashboard/accountant"
            element={<AccountantDashboard />}
          />
          <Route
            path="/:slug/dashboard/school-admin"
            element={<SchoolAdminDashboard />}
          />
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/super-admin/schools" element={<Schools />} />

          {/* === Classes === */}
          <Route path="/head-teacher/class/new" element={<RegisterClass />} />
          <Route path="/:slug/dashboard/class/view" element={<ViewClass />} />

          {/* === Streams === */}
          <Route
            path="/head-teacher/streams/new"
            element={<RegisterStream />}
          />

          {/* === Principal submenus === */}
          <Route
            path="/:slug/principal/teachers/view"
            element={<ViewTeachers />}
          />

          {/* === Allocation === */}
            <Route
            path="/dashboard/class-overview"
            element={<ClassOverView />}
          />

          {/* === Students and Guardian === */}
          <Route path="/:slug/student/new" element={<RegisterStudent />} />
          <Route path="/:slug/students/view" element={<ViewStudents />} />
          <Route path="/:slug/guardian/view" element={<ViewGuardian />} />

          {/* === Miscellaneous === */}
        </Routes>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
