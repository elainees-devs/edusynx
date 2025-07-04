// server/src/docs/components/schemas/event.schema.ts
export const eventSchema = {
         EventCreate: {
          type: "object",
          required: ["title", "date"],
          properties: {
            title: {
              type: "string",
              example: "Graduation Ceremony",
            },
            description: {
              type: "string",
              example: "Celebrating the 2024 class",
            },
            date: {
              type: "string",
              format: "date-time",
              example: "2024-11-15T10:00:00Z",
            },
          },
        },
        EventUpdate: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            description: {
              type: "string",
            },
            date: {
              type: "string",
              format: "date-time",
            },
          },
        },
}