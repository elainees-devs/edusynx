// server/src/docs/components/schemas/class.schema.ts
export const classSchema = {
  ClassCreate: {
    type: "object",
    required: ["school", "clasName", "academicYear"],
    properties: {
      school: { type: "string" },       // school ID
      clasName: { type: "string" },        // class grade (e.g., "6")
      academicYear: { type: "string" }, // academic year (e.g., "2025")
    },
  },
  ClassUpdate: {
    type: "object",
    properties: {
      clasName: { type: "string" },
      academicYear: { type: "string" },
    },
  },
};
