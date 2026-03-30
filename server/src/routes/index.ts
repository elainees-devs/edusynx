// Core/School Structure
export { schoolRouter } from './school.route';
export { classRouter } from './class.route';
export { classTeacherRoute } from './class.teacher.route';
export { departmentRouter } from './department.route';
export { streamRouter } from './stream.route';
export { cbcRouter } from './cbc.route';

// People
export { userRouter } from './user.route';
export { guardianRouter } from './guardian.route';
export { studentRouter } from './student.route';
export { profileRouter } from './profile.route';
// export { superAdminRouter } from './super-admin.route'; // Uncomment if exists

// Academics
export { subjectRouter } from './subject.route';
export { teacherSubjectRouter } from './teacher-subject.route';
export { teacherSubjectAllocationRouter } from './teacherSubject.allocation.route';
export { examRouter } from './exam.route';
export { attendanceRouter } from './attendance.route';

// Finance
export { feeRouter } from './fee.route';
export { feePaymentRouter } from './feePayment.route';
export { invoiceRouter } from './invoice.route';
export { invoiceItemRouter } from './invoiceItem.route';
export { paymentRouter } from './payment.route';

// Permissions/Security
export { permissionRouter } from './permission.route';
export { rolePermissionRouter } from './rolePermission.route';
export { loginRouter } from './login.route';
export { sessionRouter } from './session.route';
export { resetRouter } from './password-reset.route';

// Allocation
export { allocationRouter } from './allocation.route';

// Notification/Event/Analytics
export { notificationRouter } from './notification.route';
export { eventRouter } from './event.route';
export { analyticsRouter } from './analytics.route';
export { emailRouter } from './email.route';

// Subscription
export { subscriptionPlanRouter } from './subscription-plan.route';
export { subscriptionRouter } from './subscription.route';
