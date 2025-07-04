// server/src/docs/components/schemas/email.schema.ts
export const sendLinkSchema = {
       SendAccessLink: {
          type: "object",
          required: ["email", "accessUrl"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "user@example.com",
            },
            accessUrl: {
              type: "string",
              format: "uri",
              example: "https://example.com/access/abc123",
            },
          },
        },
}