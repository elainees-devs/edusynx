// server/src/docs/components/schemas/subject.schema.ts
export const subjectSchema = {
          SubjectCreate: {
          type: "object",
          required: ["name", "code", "schoolId"],
          properties: {
            name: { type: "string", example: "Mathematics" },
            code: { type: "string", example: "MATH101" },
            schoolId: { type: "string", example: "64abc123456def" },
          },
        },
        SubjectUpdate: {
          type: "object",
          properties: {
            name: { type: "string", example: "Advanced Mathematics" },
            code: { type: "string", example: "MATH102" },
          },
        },
}