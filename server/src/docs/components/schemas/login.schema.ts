// server/src/docs/components/schemas/login.schema.ts
export const loginSchema = {
          
            LoginRequest: {
              type: "object",
              required: ["email", "password"],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "admin@edusynx.com",
                },
                password: {
                  type: "string",
                  example: "StrongP@ssw0rd!",
                },
              },
            },
          }
