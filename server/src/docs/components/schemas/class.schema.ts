// server/src/docs/components/schemas/class.schema.ts
export const classSchema = {
      ClassCreate: {
          type: "object",
          required: ["name", "schoolId", "academicYear"],
          properties: {
            name: { type: "string" },
            schoolId: { type: "string" },
            academicYear: { type: "string" },
          },
        },
        ClassUpdate: {
          type: "object",
          properties: {
            name: { type: "string" },
            academicYear: { type: "string" },
          },
        },
}