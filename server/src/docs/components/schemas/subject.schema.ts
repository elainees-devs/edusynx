export const subjectSchema = {
  SubjectCreate: {
    type: "object",
    required: ["subjectName", "school", "classRef"],
    properties: {
      subjectName: { type: "string", example: "Mathematics" },
      school: { type: "string", example: "64abc123456def" }, 
      classRef: { type: "string", example: "64abc987654321" },
    },
  },
  SubjectUpdate: {
    type: "object",
    properties: {
      subjectName: { type: "string", example: "Advanced Mathematics" },
      school: { type: "string", example: "64abc123456def" }, 
      classRef: { type: "string", example: "64abc987654321" },
    },
  },
};
