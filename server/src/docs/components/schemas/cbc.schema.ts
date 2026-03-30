// server/src/docs/components/schemas/cbc.schema.ts


export const cbcSchema = {
  AssessmentCreate: {
    type: "object",
    required: ["title", "type"],
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      type: { type: "string", enum: ["formative", "summative"] },
      criteria: { type: "array", items: { type: "string" } },
    },
  },
  AssessmentUpdate: {
    type: "object",
    properties: {
      title: { type: "string" },
      description: { type: "string" },
      type: { type: "string", enum: ["formative", "summative"] },
      criteria: { type: "array", items: { type: "string" } },
    },
  },

  LearningOutcomeCreate: {
    type: "object",
    required: ["code", "description"],
    properties: {
      code: { type: "string" },
      description: { type: "string" },
      assessments: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/AssessmentCreate" },
      },
    },
  },
  LearningOutcomeUpdate: {
    type: "object",
    properties: {
      code: { type: "string" },
      description: { type: "string" },
      assessments: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/AssessmentUpdate" },
      },
    },
  },

  SubStrandCreate: {
    type: "object",
    required: ["code", "title"],
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      learningOutcomes: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/LearningOutcomeCreate" },
      },
    },
  },
  SubStrandUpdate: {
    type: "object",
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      learningOutcomes: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/LearningOutcomeUpdate" },
      },
    },
  },

  StrandCreate: {
    type: "object",
    required: ["code", "title"],
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      subStrands: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/SubStrandCreate" },
      },
    },
  },
  StrandUpdate: {
    type: "object",
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      subStrands: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/SubStrandUpdate" },
      },
    },
  },

  CompetencyCreate: {
    type: "object",
    required: ["code", "title"],
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      strands: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/StrandCreate" },
      },
    },
  },
  CompetencyUpdate: {
    type: "object",
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      strands: {
        type: "array",
        items: { $ref: "#/components/schemas/cbcSchema/StrandUpdate" },
      },
    },
  },
};
