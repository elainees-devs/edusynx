// server/src/docs/components/schemas/payment.schema.ts
export const paymentSchema = {
          PaymentCreate: {
          type: "object",
          required: ["studentId", "invoiceId", "amount", "method"],
          properties: {
            studentId: { type: "string", example: "64abc123456def" },
            invoiceId: { type: "string", example: "64inv789abc456" },
            amount: { type: "number", example: 2500 },
            method: { type: "string", example: "Mpesa" },
            reference: { type: "string", example: "MPESA123456" },
            date: {
              type: "string",
              format: "date-time",
              example: "2025-07-01T09:00:00Z",
            },
          },
        },
        PaymentUpdate: {
          type: "object",
          properties: {
            amount: { type: "number", example: 3000 },
            method: { type: "string", example: "Bank Transfer" },
            reference: { type: "string", example: "BANK98765XYZ" },
            date: { type: "string", format: "date-time" },
          },
        },
}