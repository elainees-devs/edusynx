// server/src/docs/components/schemas/guardian.schema.ts
export const guardianSchema = {
  GuardianCreate: {
    type: "object",
    required: ["firstName", "lastName", "email", "primaryPhoneNumber"],
    properties: {
      firstName: { type: "string" },
      middleName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      secondaryEmail: { type: "string", format: "email" },
      primaryPhoneNumber: { type: "string" },
      secondaryPhoneNumber: { type: "string" },
    },
    additionalProperties: false,
  },

  UpdateGuardian: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      middleName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
      secondaryEmail: { type: "string", format: "email" },
      primaryPhoneNumber: { type: "string" },
      secondaryPhoneNumber: { type: "string" },
    },
    additionalProperties: false,
  },
};