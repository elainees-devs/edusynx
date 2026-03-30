// server/src/docs/components/schemas/cbc.schema.ts

export const AssessmentSchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "Assessment ID" },
    title: { type: "string" },
    description: { type: "string" },
    type: { type: "string", enum: ["formative", "summative"] },
    criteria: { type: "array", items: { type: "string" } },
  },
  required: ["title", "type"],
};

export const LearningOutcomeSchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "Learning Outcome ID" },
    code: { type: "string" },
    description: { type: "string" },
    assessments: { type: "array", items: AssessmentSchema },
  },
  required: ["code", "description"],
};

export const SubStrandSchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "SubStrand ID" },
    code: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    learningOutcomes: { type: "array", items: LearningOutcomeSchema },
  },
  required: ["code", "title"],
};

export const StrandSchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "Strand ID" },
    code: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    subStrands: { type: "array", items: SubStrandSchema },
  },
  required: ["code", "title"],
};

export const CompetencySchema = {
  type: "object",
  properties: {
    _id: { type: "string", description: "Competency ID" },
    code: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    strands: { type: "array", items: StrandSchema },
  },
  required: ["code", "title"],
};
