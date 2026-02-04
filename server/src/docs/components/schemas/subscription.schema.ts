// server/src/docs/components/schemas/subscription.schema.ts
export const subscriptionSchema = {
  SubscriptionCreate: {
    type: "object",
    required: ["school", "planId", "startDate", "endDate"],
    properties: {
      school: {
        type: "string",
        description: "MongoDB ObjectId of the school",
        example: "695d29b347d57b0dc35577d3",
      },
      planId: {
        type: "string",
        description: "MongoDB ObjectId of the subscription plan",
        example: "695d2ab347d57b0dc35577d4",
      },
      startDate: {
        type: "string",
        format: "date",
        description: "Subscription start date",
        example: "2026-02-01",
      },
      endDate: {
        type: "string",
        format: "date",
        description: "Subscription end date",
        example: "2026-02-28",
      },
      isActive: {
        type: "boolean",
        description: "Indicates if the subscription is active",
        example: true,
      },
    },
  },
  SubscriptionUpdate: {
    type: "object",
    properties: {
      school: {
        type: "string",
        description: "MongoDB ObjectId of the school",
      },
      planId: {
        type: "string",
        description: "MongoDB ObjectId of the subscription plan",
      },
      startDate: {
        type: "string",
        format: "date",
        description: "Subscription start date",
      },
      endDate: {
        type: "string",
        format: "date",
        description: "Subscription end date",
      },
      isActive: {
        type: "boolean",
        description: "Indicates if the subscription is active",
      },
    },
  },
};
