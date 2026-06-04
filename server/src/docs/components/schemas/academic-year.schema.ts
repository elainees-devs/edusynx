export const academicYearSchema = {
  AcademicYearCreate: {
    type: "object",
    required: ["school", "name", "startDate", "endDate"],
    properties: {
      school: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      name: { type: "string", example: "2025-2026" },
      startDate: { type: "string", format: "date", example: "2025-01-15" },
      endDate: { type: "string", format: "date", example: "2025-12-20" },
      isActive: { type: "boolean", default: false },
      terms: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string", example: "Term 1" },
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
          },
        },
      },
    },
  },

  AcademicYearUpdate: {
    type: "object",
    properties: {
      name: { type: "string" },
      startDate: { type: "string", format: "date" },
      endDate: { type: "string", format: "date" },
      isActive: { type: "boolean" },
      terms: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
          },
        },
      },
    },
  },
};
