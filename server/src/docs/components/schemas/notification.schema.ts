// server/src/docs/components/schema/notification.schema.ts
export const notificationSchema = {
       NotificationCreate: {
          type: "object",
          required: ["userId", "title", "message"],
          properties: {
            userId: { type: "string", example: "64bf123abc456def7890" },
            title: { type: "string", example: "New Assignment Posted" },
            message: {
              type: "string",
              example: "Please check your dashboard for the new assignment.",
            },
            type: { type: "string", example: "assignment" },
            read: { type: "boolean", example: false },
          },
        },
        NotificationUpdate: {
          type: "object",
          required: ["read"],
          properties: {
            read: { type: "boolean", example: true },
          },
        },
}