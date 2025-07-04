// server/src/docs/components/schemas/user.schema.ts
export const userSchema = {
  UserCreate: {
    type: "object",
    required: ["firstName", "lastName", "email", "role", "password"],
    properties: {
      firstName: { type: "string", example: "Alice" },
      lastName: { type: "string", example: "Njeri" },
      email: { type: "string", example: "alice@example.com" },
      password: { type: "string", example: "SecurePass123!" },
      role: { type: "string", example: "teacher" },
      schoolId: { type: "string", example: "64e6123f9b0a4e001fa9ab01" },
    },
  },
  UserUpdate: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string" },
      role: { type: "string" },
      password: { type: "string" },
    },
  },
};
