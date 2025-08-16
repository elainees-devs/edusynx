// client/src/pages/index.ts
// This file serves as a central export point for all pages in the application.

// ---------- Auth Pages ----------
export { default as SignIn } from './signin/signin';
export { default as SignUp } from './signup/signup';
export { default as SuperAdminSignIn } from './signin/super-admin-signin';
export { default as SuperAdminSignUp } from './signup/super-admin-signup';
export { default as Logout } from './logout';
export { default as ResetPassword } from './password/reset-password';
export { default as NewPassword } from './password/new-password';

// ---------- Landing Page ----------
export { default as HomePage } from './home';

// ---------- School Registration ----------
export { default as SchoolSignupPage } from './signup/signup-school'

// ---------- Class and Stream Management ----------
export { default as RegisterClass } from './class/register-class';
export { default as ViewClass } from './class/view-class';
export { default as RegisterStream } from './stream/register-stream';

// ---------- Student Management ----------
export { default as RegisterStudent } from './student/register-student';
export { default as ViewStudents } from './student/view-students';

// ---------- Teacher Management ----------
export { default as ViewTeachers } from './teachers/view-teachers';

// ---------- Dashboard Pages ----------
export { default as Schools } from './dashboard/schools';
