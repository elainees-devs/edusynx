import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

// === Public / Auth Pages ===
const HomePage = lazy(() => import("../pages/Home"));
const SignIn = lazy(() => import("../pages/signin/Signin"));
const SignUp = lazy(() => import("../pages/signup/Signup"));
const SuperAdminSignIn = lazy(() => import("../pages/signin/SuperAdminSignin"));
const SuperAdminSignUp = lazy(() => import("../pages/signup/SuperAdminSignup"));
const Logout = lazy(() => import("../pages/Logout"));
const ResetPassword = lazy(() => import("../pages/password/ResetPassword"));
const NewPassword = lazy(() => import("../pages/password/NewPassword"));
const SchoolSignupPage = lazy(() => import("../pages/signup/SignupSchool"));

// === Dashboards ===
const Schools = lazy(() => import("../pages/dashboard/Schools"));
const AccountantDashboard = lazy(() => import("../pages/dashboard/Accountant"));
const TeacherDashboard = lazy(() => import("../pages/dashboard/Teacher"));
const GuardianDashboard = lazy(() => import("../pages/dashboard/Guardian"));
const PrincipalDashboard = lazy(() => import("../pages/dashboard/Principal"));
const SchoolAdminDashboard = lazy(() => import("../pages/dashboard/SchoolAdmin"));
const SuperAdminDashboard = lazy(() => import("../pages/dashboard/SuperAdmin"));

// === Core School Structure ===
const RegisterClass = lazy(() => import("../pages/class/RegisterClass"));
const ViewClass = lazy(() => import("../pages/class/ViewClass"));
const RegisterStream = lazy(() => import("../pages/stream/RegisterStream"));
const ViewStreams = lazy(() => import("../pages/stream/ViewStream"));
const ClassOverView = lazy(() => import("../pages/class/ClassOverview"));
const ViewAcademicYears = lazy(() => import("../pages/academic-year/ViewAcademicYears"));
const RegisterAcademicYear = lazy(() => import("../pages/academic-year/RegisterAcademicYear"));
const ViewDepartments = lazy(() => import("../pages/departments/ViewDepartments"));
const RegisterDepartment = lazy(() => import("../pages/departments/RegisterDepartment"));

// === Academics ===
const RegisterSubject = lazy(() => import("../pages/subject/RegisterSubject"));
const ViewSubjects = lazy(() => import("../pages/subject/ViewSubject"));
const ViewTeachers = lazy(() => import("../pages/teachers/ViewTeachers"));
const AssignSubjects = lazy(() => import("../pages/allocation/SubjectAssignment"));
const RegisterCompetency = lazy(() => import("../pages/cbc/RegisterCompetency"));  
const RegisterStrand = lazy(() => import("../pages/cbc/RegisterStrand"));
const ViewCompetency = lazy(() => import("../pages/cbc/ViewCompetency"));
const ViewStrand = lazy(() => import("../pages/cbc/ViewStrand"));

// === Students & Parents ===
const RegisterStudent = lazy(() => import("../pages/student/RegisterStudent"));
const ViewStudents = lazy(() => import("../pages/student/ViewStudents"));
const StudentDetail = lazy(() => import("../pages/student/StudentDetail"));
const ViewGuardian = lazy(() => import("../pages/student/ViewGuardian"));
const ViewEnrollments = lazy(() => import("../pages/enrollment/ViewEnrollments"));
const RegisterEnrollment = lazy(() => import("../pages/enrollment/RegisterEnrollment"));

// === Staff ===
const ViewStaff = lazy(() => import("../pages/staff/ViewStaff"));
const RegisterStaff = lazy(() => import("../pages/staff/RegisterStaff"));
const StaffDetail = lazy(() => import("../pages/staff/StaffDetail"));

// === Attendance ===
const RegisterAttendancePage = lazy(() => import("../pages/attendance/RegisterAttendance"));
const ViewAttendance = lazy(() => import("../pages/attendance/ViewAttendance"));
const AttendanceAnalytics = lazy(() => import("../pages/attendance/AttendanceAnalytics"));
const StudentAttendancePage = lazy(() => import("../pages/attendance/StudentAttendancePage"));

// === Finance (Missing in original App.tsx) ===
// const Fees = lazy(() => import("../pages/Fees"));
// const Invoice = lazy(() => import("../pages/Invoice"));
// const Payments = lazy(() => import("../pages/Payments"));

// // === Communication & Management (Missing in original App.tsx) ===
// const Events = lazy(() => import("../pages/Events"));
// const Messages = lazy(() => import("../pages/Messages"));
// const Notifications = lazy(() => import("../pages/Notifications"));
// const Reports = lazy(() => import("../pages/Reports"));
// const Profile = lazy(() => import("../pages/profile/Index"));
// const ProfileSettings = lazy(() => import("../pages/profile/Settings"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* === Public / Authentication / Home === */}
        <Route path="/" element={<HomePage />} />
        <Route path="/:slug/sign-in" element={<SignIn />} />
        <Route path="/:slug/signup" element={<SignUp />} />
        <Route path="/super-admin/sign-up" element={<SuperAdminSignUp />} />
        <Route path="/super-admin/sign-in" element={<SuperAdminSignIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signup-school" element={<SchoolSignupPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />

        {/* === Protected Routes === */}
        <Route element={<ProtectedRoute />}>
          {/* === Dashboards === */}
          <Route path="/:slug/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/:slug/dashboard/principal" element={<PrincipalDashboard />} />
          <Route path="/:slug/dashboard/guardian" element={<GuardianDashboard />} />
          <Route path="/:slug/dashboard/accountant" element={<AccountantDashboard />} />
          <Route path="/:slug/dashboard/school-admin" element={<SchoolAdminDashboard />} />
          <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          <Route path="/super-admin/schools" element={<Schools />} />

   

          {/* === Classes & Streams === */}
          <Route path="/class/new" element={<RegisterClass />} />
          <Route path="/dashboard/class/view" element={<ViewClass />} />
          <Route path="/:slug/dashboard/class/view" element={<ViewClass />} />
          <Route path="/streams/new" element={<RegisterStream />} />
          <Route path="/dashboard/streams/view" element={<ViewStreams />} />
          <Route path="/dashboard/class-overview" element={<ClassOverView />} />

          {/* === Staff & Departments === */}
          <Route path="/dashboard/staff/view" element={<ViewStaff />} />
          <Route path="/dashboard/staff/register" element={<RegisterStaff />} />
          <Route path="/dashboard/staff/:id" element={<StaffDetail />} />
          <Route path="/dashboard/departments/view" element={<ViewDepartments />} />
          <Route path="/dashboard/departments/register" element={<RegisterDepartment />} />
          <Route path="/:slug/principal/teachers/view" element={<ViewTeachers />} />

          {/* === Academics & CBC === */}
          <Route path="/dashboard/subjects/new" element={<RegisterSubject />} />
          <Route path="/dashboard/subjects/view" element={<ViewSubjects />} />
          <Route path="/dashboard/teachers/assign" element={<AssignSubjects />} />
          <Route path="/dashboard/competency/new" element={<RegisterCompetency />} />
          <Route path="/dashboard/strands/new" element={<RegisterStrand />} />
          <Route path="/dashboard/competency/view" element={<ViewCompetency />} />
          <Route path="/dashboard/strands/view" element={<ViewStrand />} />
          <Route path="/academic-years" element={<ViewAcademicYears />} />
          <Route path="/academic-years/register" element={<RegisterAcademicYear />} />

          {/* === Students & Enrollment === */}
          <Route path="/dashboard/students/register" element={<RegisterStudent />} />
          <Route path="/:slug/dashboard/students/register" element={<RegisterStudent />} />
          <Route path="/dashboard/students/view" element={<ViewStudents />} />
          <Route path="/:slug/dashboard/students/view" element={<ViewStudents />} />
          <Route path="/dashboard/students/:id" element={<StudentDetail />} />
          <Route path="/:slug/dashboard/students/:id" element={<StudentDetail />} />
          <Route path="/:slug/guardian/view" element={<ViewGuardian />} />
          <Route path="/enrollments" element={<ViewEnrollments />} />
          <Route path="/enrollments/register" element={<RegisterEnrollment />} />
          <Route path="/enrollments/bulk" element={<RegisterEnrollment />} />

          {/* === Attendance === */}
          <Route path="/dashboard/attendance/register/" element={<RegisterAttendancePage />} />
          <Route path="/:slug/dashboard/student/attendance/new" element={<StudentAttendancePage />} />
          <Route path="/dashboard/attendance/records" element={<ViewAttendance />} />
          <Route path="/:slug/dashboard/attendance/records" element={<ViewAttendance />} />
          <Route path="/dashboard/teachers/attendance" element={<ViewAttendance />} />
          <Route path="/:slug/dashboard/teachers/attendance" element={<ViewAttendance />} />
          <Route path="/dashboard/attendance/analytics" element={<AttendanceAnalytics />} />
          <Route path="/:slug/dashboard/attendance/analytics" element={<AttendanceAnalytics />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
