// server/src/docs/components/schemas/invoice.schema.ts
export const invoiceSchema = {
     InvoiceCreate: {
          type: "object",
          required: ["studentId", "items", "total"],
          properties: {
            studentId: { type: "string", example: "64abc123456def" },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string", example: "Library Fee" },
                  amount: { type: "number", example: 1500 },
                },
              },
            },
            total: { type: "number", example: 3000 },
            dueDate: { type: "string", format: "date", example: "2025-09-30" },
          },
        },
        InvoiceUpdate: {
          type: "object",
          properties: {
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  amount: { type: "number" },
                },
              },
            },
            total: { type: "number" },
            dueDate: { type: "string", format: "date" },
          },
        },

}