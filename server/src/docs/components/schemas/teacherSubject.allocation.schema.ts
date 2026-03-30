// server/src/docs/components/schemas/teacherSubject.allocation.schema.ts

export const teacherSubjectAllocationSchema = {
  TeacherSubjectAllocation: {
    type: "object",
    properties: {
      teacher: { type: "string", description: "Teacher ID" },
      subject: { type: "string", description: "Subject ID" },
      clasName: { type: "string", description: "Class ID" },
      stream: { type: "string", description: "Stream ID" }
    },
    required: ["teacher", "subject", "clasName", "stream"]
  }
};
