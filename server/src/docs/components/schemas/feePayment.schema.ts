// server/src/docs/components/schemas/feePayment.schema.ts
export const feePaymentSchema = {
     FeePaymentCreate: {
          type: "object",
          required: ["studentId", "term", "amount"],
          properties: {
            studentId: { type: "string", example: "64babc123456def7890" },
            term: { type: "string", example: "Term 2" },
            amount: { type: "number", example: 5000 },
          },
        },
        FeePaymentUpdate: {
          type: "object",
          properties: {
            term: { type: "string" },
            amount: { type: "number" },
          },
        },
        FeePaymentAdd: {
          type: "object",
          required: ["summaryId", "amount"],
          properties: {
            summaryId: { type: "string", example: "64bsummary1234def5678" },
            amount: { type: "number", example: 2500 },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T09:00:00Z",
            },
          },
        },
}