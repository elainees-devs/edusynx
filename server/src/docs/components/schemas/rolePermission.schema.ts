// server/src/docs/components/schemas/rolePermission.schema.ts
export const rolePermissionSchema= {
          RolePermissionCreate: {
          type: "object",
          required: ["roleId", "permissionId", "schoolId"],
          properties: {
            roleId: { type: "string", example: "64abc123def456" },
            permissionId: { type: "string", example: "64perm789abc" },
            schoolId: { type: "string", example: "64school123xyz" },
          },
        },
        RolePermissionUpdate: {
          type: "object",
          properties: {
            roleId: { type: "string" },
            permissionId: { type: "string" },
            schoolId: { type: "string" },
          },
        },
}