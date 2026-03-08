// client/src/App.tsx
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const HomePage = lazy(() => import("./pages/Home"));
const SignIn = lazy(() => import("./pages/signin/Signin"));
const SignUp = lazy(() => import("./pages/signup/Signup"));
const SuperAdminSignIn = lazy(() => import("./pages/signin/SuperAdminSignin"));
const SuperAdminSignUp = lazy(() => import("./pages/signup/SuperAdminSignup"));
const Logout = lazy(() => import("./pages/Logout"));
const ResetPassword = lazy(() => import("./pages/password/ResetPassword"));
const NewPassword = lazy(() => import("./pages/password/NewPassword"));
const SchoolSignupPage = lazy(() => import("./pages/signup/SignupSchool"));
const RegisterClass = lazy(() => import("./pages/class/RegisterClass"));
const ViewClass = lazy(() => import("./pages/class/ViewClass"));
const RegisterStream = lazy(() => import("./pages/stream/RegisterStream"));
const ViewStreams = lazy(() => import("./pages/stream/ViewStream"));
const ClassOverView = lazy(() => import("./pages/class/ClassOverview"));
const RegisterSubject = lazy(() => import("./pages/subject/RegisterSubject"));
const ViewSubjects = lazy(() => import("./pages/subject/ViewSubject"));
const RegisterStudent = lazy(() => import("./pages/student/RegisterStudent"));
const ViewStudents = lazy(() => import("./pages/student/ViewStudents"));
const ViewGuardian = lazy(() => import("./pages/student/ViewGuardian"));
const RegisterAttendancePage = lazy(() => import("./pages/attendance/RegisterAttendance"));
const ViewAttendance = lazy(() => import("./pages/attendance/ViewAttendance"));
const ViewTeachers = lazy(() => import("./pages/teachers/ViewTeachers"));
const Schools = lazy(() => import("./pages/dashboard/Schools"));
const AccountantDashboard = lazy(() => import("./pages/dashboard/Accountant"));
const TeacherDashboard = lazy(() => import("./pages/dashboard/Teacher"));
const GuardianDashboard = lazy(() => import("./pages/dashboard/Guardian"));
const PrincipalDashboard = lazy(() => import("./pages/dashboard/Principal"));
const SchoolAdminDashboard = lazy(() => import("./pages/dashboard/SchoolAdmin"));
const SuperAdminDashboard = lazy(() => import("./pages/dashboard/SuperAdmin"));
import GlobalStateProvider from "./context/global/useGlobalState";
// import ClassTeacher from "./pages/allocation/class-teacher";


function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
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
            <Route path="/class/new" element={<RegisterClass />} />
            <Route path="/:slug/dashboard/class/view" element={<ViewClass />} />

            {/* === Streams === */}
            <Route path="/streams/new" element={<RegisterStream />} />
            <Route path="/dashboard/streams/view" element={<ViewStreams />} />

            {/* === Principal submenus === */}
            <Route
              path="/:slug/principal/teachers/view"
              element={<ViewTeachers />}
            />

            {/* === Allocation === */}
            <Route path="/dashboard/class-overview" element={<ClassOverView />} />

            {/* === Subjects === */}
            <Route path="/dashboard/subjects/new" element={<RegisterSubject />} />
            <Route path="/dashboard/subjects/view" element={<ViewSubjects />} />
            {/* === Students and Guardian === */}
            <Route path="/:slug/student/new" element={<RegisterStudent />} />
            <Route path="/:slug/students/view" element={<ViewStudents />} />
            <Route path="/:slug/guardian/view" element={<ViewGuardian />} />

            {/* === Attendance === */}
            <Route
              path="/dashboard/attendance/register/"
              element={<RegisterAttendancePage />}
            />
            <Route
              path="/dashboard/attendance/records"
              element={<ViewAttendance />}
            />

            {/* === Miscellaneous === */}
          </Routes>
        </Suspense>
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
