export const staffSchema = {
  CreateStaffDTO: {
    type: "object",
    required: ["school", "firstName", "lastName", "email", "role", "primaryPhoneNumber", "nationality"],
    properties: {
      school: { type: "string", example: "64e6123f9b0a4e001fa9ab01" },
      firstName: { type: "string", example: "Alice" },
      middleName: { type: "string", example: "M." },
      lastName: { type: "string", example: "Njeri" },
      email: { type: "string", example: "alice@school.com" },
      primaryPhoneNumber: { type: "string", example: "+254712345678" },
      nationality: { type: "string", example: "Kenyan" },
      role: { type: "string", enum: ["teacher", "principal", "deputy-principal", "accountant", "school-admin"], example: "teacher" },
      position: { type: "string", example: "Senior Teacher" },
      isClassTeacher: { type: "boolean", example: false },
      isHeadOfDepartment: { type: "boolean", example: false },
      department: { type: "string", example: "64e6123f9b0a4e001fa9ab02" },
      assignedClass: { type: "string", example: "64e6123f9b0a4e001fa9ab03" },
      employmentDate: { type: "string", format: "date", example: "2026-01-15" },
    },
  },
  UpdateStaffDTO: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      middleName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      primaryPhoneNumber: { type: "string" },
      role: { type: "string", enum: ["teacher", "principal", "deputy-principal", "accountant", "school-admin"] },
      position: { type: "string" },
      isActive: { type: "boolean" },
      department: { type: "string" },
    },
  },
  AssignDepartmentDTO: {
    type: "object",
    required: ["departmentId"],
    properties: {
      departmentId: { type: "string", example: "64e6123f9b0a4e001fa9ab02" },
    },
  },
  AssignPositionDTO: {
    type: "object",
    required: ["position"],
    properties: {
      position: { type: "string", example: "Head of Department" },
    },
  },
};
