// server/src/docs/components/schemas/student.schema.ts
export const studentSchema = {
  StudentCreate: {
    type: "object",
    required: [
      "firstName",
      "middleName",
      "lastName",
      "gender",
      "dateOfBirth",
      "admissionDate",
      "previousSchool",
      "studentId",
      "school",
      "classId",
      "clasName",
      "streamId",
      "streamName",
      "guardianId",
    ],
    properties: {
      firstName: { type: "string", example: "John" },
      middleName: { type: "string", example: "M." },
      lastName: { type: "string", example: "Doe" },

      gender: {
        type: "string",
        enum: ["Male", "Female"],
        example: "Male",
      },

      dateOfBirth: {
        type: "string",
        format: "date",
        example: "2010-06-15",
      },

      admissionDate: {
        type: "string",
        format: "date",
        example: "2023-09-01",
      },

      classId: { type: "string", example: "64c23bcf9f2b1b0b8d6c6abc" },
      clasName: { type: "string", example: "5" },

      streamId: { type: "string", example: "64c23bcf9f2b1b0b8d6c6def" },
      streamName: { type: "string", example: "blue" },

      guardianId: { type: "string", example: "64c23bcf9f2b1b0b8d6c6fed" },

      previousSchool: { type: "string" },
    },
  },

  StudentUpdate: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },

      gender: { type: "string", enum: ["Male", "Female"] },

      dateOfBirth: { type: "string", format: "date" },
      admissionDate: { type: "string", format: "date" },

      previousSchool: { type: "string" },

      classId: { type: "string" },
      guardianId: { type: "string" },
    },
  },
};
