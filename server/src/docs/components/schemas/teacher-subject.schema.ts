export const teacherSubjectSchema = {
  TeacherSubjectCreate: {
    type: "object",
    required: ["school", "teacherId", "subjectIds", "classIds"],
    properties: {
      school: { type: "string", example: "64abc123456def" },
      teacherId: { type: "string", example: "64def456789abc" },
      subjectIds: {
        type: "array",
        items: { type: "string", example: "64abc987654321" },
        description: "One or more subjects assigned to the teacher",
      },
      classIds: {
        type: "array",
        items: { type: "string", example: "64abc567890123" },
        description: "One or more classes the teacher teaches",
      },
      streamIds: {
        type: "array",
        items: { type: "string", example: "64abc456789012" },
        description: "Optional streams for the assigned classes",
      },
    },
  },

  TeacherSubjectUpdate: {
    type: "object",
    properties: {
      school: { type: "string", example: "64abc123456def" },
      teacherId: { type: "string", example: "64def456789abc" },
      subjectIds: {
        type: "array",
        items: { type: "string", example: "64abc987654321" },
        description: "Updated subjects for the teacher",
      },
      classIds: {
        type: "array",
        items: { type: "string", example: "64abc567890123" },
        description: "Updated classes for the teacher",
      },
      streamIds: {
        type: "array",
        items: { type: "string", example: "64abc456789012" },
        description: "Updated streams for the teacher",
      },
    },
  },
};
