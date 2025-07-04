// server/src/docs/components/schemas/fee.schema.ts
export const feeSchema = {
     FeeCreate: {
          type: "object",
          required: ["schoolId", "amount", "type"],
          properties: {
            schoolId: {
              type: "string",
              example: "64b123abc456def789012345",
            },
            amount: {
              type: "number",
              example: 5000,
            },
            type: {
              type: "string",
              example: "Tuition",
            },
            description: {
              type: "string",
              example: "Term 1 tuition fee",
            },
          },
        },
        FeeUpdate: {
          type: "object",
          properties: {
            amount: { type: "number" },
            type: { type: "string" },
            description: { type: "string" },
          },
        },
}