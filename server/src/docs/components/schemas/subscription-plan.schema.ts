// server/src/docs/components/schemas/subscription.schema.ts
export const subscriptionPlanSchema = {
  SubscriptionPlanCreate: {
    type: "object",
    required: ["name", "price", "durationInMonths", "features"],
    properties: {
      name: {
        type: "string",
        description: "Name of the subscription plan",
        example: "Professional",
      },
      price: {
        type: "number",
        description: "Price of the plan in KES",
        example: 6500,
      },
      durationInMonths: {
        type: "number",
        description: "Duration of the plan in months",
        example: 1,
      },
      features: {
        type: "array",
        description: "List of feature keys included in this plan",
        items: {
          type: "string",
          example: "student-attendance-management",
        },
      },
    },
  },
  SubscriptionPlanUpdate: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the subscription plan",
      },
      price: {
        type: "number",
        description: "Price of the plan in KES",
      },
      durationInMonths: {
        type: "number",
        description: "Duration of the plan in months",
      },
      features: {
        type: "array",
        description: "List of feature keys included in this plan",
        items: {
          type: "string",
        },
      },
    },
  },
};
