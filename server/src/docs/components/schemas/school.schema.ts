// server/src/docs/components/schemas/school.schema.ts

export const schoolSchema = {
  SchoolCreate: {
    type: "object",
    required: ["name", "email", "phone", "address", "subscription"],
    properties: {
      name: { type: "string", example: "Greenfield Academy" },
      email: { type: "string", example: "info@greenfield.ac.ke" },
      phone: { type: "string", example: "+254712345678" },
      address: { type: "string", example: "Nairobi, Kenya" },
      subscription: {
        type: "string",
        description: "MongoDB ObjectId of the subscription plan for the school",
        example: "64f4b5d21f2a3e001234abcd",
      },
    },
  },
  SchoolUpdate: {
    type: "object",
    properties: {
      name: { type: "string", example: "Greenfield International" },
      email: { type: "string" },
      phone: { type: "string" },
      address: { type: "string" },
      subscription: {
        type: "string",
        description: "MongoDB ObjectId of the subscription plan (optional update)",
        example: "64f4b5d21f2a3e001234abcd",
      },
    },
  },
};
