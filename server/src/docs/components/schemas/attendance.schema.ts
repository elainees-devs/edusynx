// server/src/docs/components/schemas/attendance.schema.ts
// server/src/docs/components/schemas/attendance.schema.ts

export const attendanceSchema = {
  AttendanceCreate: {
    type: "object",
    required: ["school", "classRef", "schoolYear", "date", "attendance"],
    properties: {
      school: { type: "string", example: "695d29b347d57b0dc35577d3" }, // school ID
      classRef: { type: "string", example: "695d29b347d57b0dc35577d3" }, // class ID
      schoolYear: { type: "string", example: "2025-2026" }, // academic year
      date: { type: "string", format: "date-time", example: "2026-02-02T00:00:00.000Z" }, // ISO date string
      attendance: {
        type: "array",
        items: {
          type: "object",
          required: ["studentId", "status"],
          properties: {
            studentId: { type: "string", example: "695d29b347d57b0dc35577d3" }, // student ID
            status: { 
              type: "string", 
              enum: ["present", "absent", "late", "excused"], 
              example: "present" 
            },
          },
        },
      },
    },
  },

  AttendanceUpdate: {
    type: "object",
    properties: {
      date: { type: "string", format: "date-time", example: "2026-02-02T00:00:00.000Z" },
      attendance: {
        type: "array",
        items: {
          type: "object",
          properties: {
            studentId: { type: "string", example: "695d29b347d57b0dc35577d3" },
            status: { 
              type: "string", 
              enum: ["present", "absent", "late", "excused"], 
              example: "present" 
            },
          },
        },
      },
    },
  },
};
