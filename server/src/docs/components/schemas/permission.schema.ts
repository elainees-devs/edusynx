// server/src/docs/components/schemas/permission.schema.ts
export const permissionSchema = {
         PermissionCreate: {
          type: "object",
          required: ["role", "actions", "schoolId"],
          properties: {
            role: { type: "string", example: "teacher" },
            actions: {
              type: "array",
              items: { type: "string" },
              example: ["view_students", "edit_grades"],
            },
            schoolId: { type: "string", example: "64abc123456def" },
          },
        },
        PermissionUpdate: {
          type: "object",
          properties: {
            role: { type: "string" },
            actions: {
              type: "array",
              items: { type: "string" },
            },
            schoolId: { type: "string" },
          },
        },
}