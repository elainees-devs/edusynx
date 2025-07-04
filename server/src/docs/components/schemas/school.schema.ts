// server/src/docs/components/schemas/school.schema.ts

export const schoolSchema ={
        SchoolCreate: {
          type: "object",
          required: ["name", "email", "phone", "address"],
          properties: {
            name: { type: "string", example: "Greenfield Academy" },
            email: { type: "string", example: "info@greenfield.ac.ke" },
            phone: { type: "string", example: "+254712345678" },
            address: { type: "string", example: "Nairobi, Kenya" },
          },
        },
        SchoolUpdate: {
          type: "object",
          properties: {
            name: { type: "string", example: "Greenfield International" },
            email: { type: "string" },
            phone: { type: "string" },
            address: { type: "string" },
          },
        },
}