// server/src/seed/seedSubscriptionPlans.ts
import { SubscriptionPlanModel } from "../models";
import { generateBackendData } from "../utils/generateFeatures";

// Generate plans from frontend pricing plans
const { plans } = generateBackendData();

//Exported async function
export const seedSubscriptionPlans = async (): Promise<void> => {
  for (const plan of plans) {
    const exists = await SubscriptionPlanModel.findOne({ name: plan.name });
    if (exists) continue; // skip if already exists

    await SubscriptionPlanModel.create({
      name: plan.name,
      price: plan.price,
      durationInMonths: plan.name === "Enterprise" ? 12 : 1,
      features: plan.features,
    });

    console.log(`✔ Seeded plan: ${plan.name}`);
  }
};
