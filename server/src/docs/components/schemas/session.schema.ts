// server/src/docs/components/schemas/session.schema.ts
export const sessionSchema = {
        SessionCreate: {
          type: "object",
          required: ["userId", "device", "ipAddress"],
          properties: {
            userId: { type: "string", example: "64abc123456def" },
            device: { type: "string", example: "Chrome on Windows 10" },
            ipAddress: { type: "string", example: "192.168.1.10" },
            isActive: { type: "boolean", example: true },
          },
        },
        SessionUpdate: {
          type: "object",
          properties: {
            device: { type: "string", example: "Edge on macOS" },
            ipAddress: { type: "string" },
            isActive: { type: "boolean" },
          },
        },
}