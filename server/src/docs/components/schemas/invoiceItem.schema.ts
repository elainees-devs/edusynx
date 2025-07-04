// server/src/docs/components/schemas/invoiceItem.schema.ts
export const invoiceItemSchema = {
     InvoiceItemCreate: {
          type: "object",
          required: ["name", "amount", "quantity"],
          properties: {
            name: { type: "string", example: "Textbooks" },
            amount: { type: "number", example: 1200 },
            quantity: { type: "integer", example: 2 },
            description: {
              type: "string",
              example: "Science textbooks for Term 2",
            },
          },
        },
        InvoiceItemUpdate: {
          type: "object",
          properties: {
            name: { type: "string" },
            amount: { type: "number" },
            quantity: { type: "integer" },
            description: { type: "string" },
          },
        },
}