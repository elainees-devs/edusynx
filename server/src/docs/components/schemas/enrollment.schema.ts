export const enrollmentSchema = {
  EnrollmentCreate: {
    type: "object",
    required: ["school", "student", "clas", "stream", "academicYear", "enrollmentDate", "status", "enrollmentType"],
    properties: {
      school: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      student: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      clas: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      stream: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      academicYear: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      enrollmentDate: { type: "string", format: "date", example: "2025-01-15" },
      status: {
        type: "string",
        enum: ["active", "transferred", "withdrawn", "graduated"],
        example: "active",
      },
      enrollmentType: {
        type: "string",
        enum: ["new", "re-enrollment", "promotion"],
        example: "new",
      },
      remarks: { type: "string", example: "Transferred from other school" },
    },
  },

  EnrollmentUpdate: {
    type: "object",
    properties: {
      clas: { type: "string" },
      stream: { type: "string" },
      academicYear: { type: "string" },
      status: {
        type: "string",
        enum: ["active", "transferred", "withdrawn", "graduated"],
      },
      enrollmentType: {
        type: "string",
        enum: ["new", "re-enrollment", "promotion"],
      },
      remarks: { type: "string" },
    },
  },
};
