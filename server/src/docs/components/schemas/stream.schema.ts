// server/src/docs/components/schemas/stream.schema.ts
export const streamSchema = {
  StreamCreate: {
    type: "object",
    required: ["school", "streamName", "academicYear"],
    properties: {
      school: {
        type: "string",
        description: "MongoDB ObjectId of the school",
        example: "695d29b347d57b0dc35577d3",
      },
      streamName: {
        type: "string",
        description: "Name of the stream",
        example: "Yellow",
      },
      academicYear: {
        type: "string",
        description: "Academic year for the stream",
        example: "2025",
      },
    },
  },
  StreamUpdate: {
    type: "object",
    properties: {
      school: {
        type: "string",
        description: "MongoDB ObjectId of the school",
      },
      streamName: {
        type: "string",
        description: "Name of the stream",
      },
      academicYear: {
        type: "string",
        description: "Academic year for the stream",
      },
    },
  },
};
