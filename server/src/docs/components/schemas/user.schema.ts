// server/src/docs/components/schemas/user.schema.ts
export const userSchema = {
  UserCreate: {
    type: "object",
    required: ["firstName", "lastName", "email", "role", "password"],
    properties: {
      firstName: { type: "string", example: "Alice" },
      middleName: { type: "string", example: "M." },
      lastName: { type: "string", example: "Njeri" },
      primaryPhoneNumber: { type: "string", example: "+1234567890" },
      email: { type: "string", example: "alice@example.com" },
      password: { type: "string", example: "SecurePass123!" },
      nationality: { type: "string", example: "Kenyan" },
      role: { type: "string", example: "teacher" },
      schoolId: { type: "string", example: "64e6123f9b0a4e001fa9ab01" },
    },
  },
  UserUpdate: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      middleName: { type: "string" },
      lastName: { type: "string" },
      primaryPhone: { type: "string" },
      email: { type: "string" },
      role: { type: "string" },
      password: { type: "string" },
    },
  },
};
