// server/src/docs/components/schemas/exam.schema.ts
export const examSchema = {
            ExamCreate: {
          type: "object",
          required: ["title", "subject", "date"],
          properties: {
            title: {
              type: "string",
              example: "Midterm Exam",
            },
            subject: {
              type: "string",
              example: "Mathematics",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-10-15T09:00:00Z",
            },
          },
        },
        ExamUpdate: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            subject: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
          },
        },
}