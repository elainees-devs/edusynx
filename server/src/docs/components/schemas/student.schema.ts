// server/src/docs/components/schemas/student.schema.ts
export const studentSchema ={
        StudentCreate: {
          type: "object",
          required: [
            "firstName",
            "lastName",
            "gender",
            "classId",
            "guardianId",
          ],
          properties: {
            firstName: { type: "string", example: "John" },
            lastName: { type: "string", example: "Doe" },
            gender: {
              type: "string",
              enum: ["Male", "Female"],
              example: "Male",
            },
            classId: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
            guardianId: { type: "string", example: "64c456edab12fe99d0cd1123" },
            dateOfBirth: {
              type: "string",
              format: "date",
              example: "2010-06-15",
            },
          },
        },
        StudentUpdate: {
          type: "object",
          properties: {
            firstName: { type: "string" },
            lastName: { type: "string" },
            classId: { type: "string" },
            guardianId: { type: "string" },
          },
        },

}
