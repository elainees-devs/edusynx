// client/src/pages/index.ts
// This file serves as a central export point for all pages in the application.

// ---------- Auth Pages ----------
export { default as SignIn } from './signin/Signin'
export { default as SignUp } from './signup/Signup'
export { default as SuperAdminSignIn } from './signin/SuperAdminSignin'
export { default as SuperAdminSignUp } from './signup/SuperAdminSignup'
export { default as Logout } from './Logout';
export { default as ResetPassword } from './password/ResetPassword'
export { default as NewPassword } from './password/NewPassword'

// ---------- Landing Page ----------
export { default as HomePage } from './Home'

// ---------- School Registration ----------
export { default as SchoolSignupPage } from './signup/SignupSchool'

// ---------- Class and Stream Management ----------
export { default as RegisterClass } from './class/RegisterClass'
export { default as ViewClass } from './class/ViewClass'
export { default as RegisterStream } from './stream/RegisterStream'
export { default as ViewStreams } from './stream/ViewStream'
export { default as ClassOverview} from './class/ClassOverview'

// ---------- Subject Management ----------
export { default as RegisterSubject} from './subject/RegisterSubject'
export { default as ViewSubjects} from './subject/ViewSubject'
export { default as AssignSubjects} from './allocation/SubjectAssignment'
// ---------- Student Management ----------
export { default as RegisterStudent } from './student/RegisterStudent'
export { default as ViewStudents } from './student/ViewStudents'
export {default as ViewGuardian} from './student/ViewGuardian'

//---------- Attendance Management ----------
export { default as RegisterAttendancePage } from './attendance/RegisterAttendance'
export { default as ViewAttendance } from './attendance/ViewAttendance'


// ---------- Teacher Management ----------
export { default as ViewTeachers } from './teachers/ViewTeachers'

// ---------- Dashboard Pages ----------
export { default as Schools } from './dashboard/Schools'

// ---------- CBC Pages ----------
export { default as RegisterCompetency } from './cbc/RegisterCompetency'
