// server/docs/components/schemas/class.teacher.schema.ts
export const classTeacherSchema = {
      ClassTeacherCreate: {
          type: "object",
          required: ["name", "schoolId", "academicYear"],
          properties: {
            teacher: { type: "string" },
            grade:{type: "string"},
            stream:{type:"string"},
            schoolId: { type: "string" },
          },
        },
        ClassTeacherUpdate: {
          type: "object",
          properties: {
             teacher: { type: "string" },
            grade:{type: "string"},
            stream:{type:"string"},
            schoolId: { type: "string" },
          },
        },
}