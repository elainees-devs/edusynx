// server/src/utils/generateFeatures.ts
import { pricingPlans } from "../constants/pricingPlans";

export interface GeneratedFeatureKey {
  key: string;
  label: string;
  group: string;
}

export interface GeneratedPlan {
  name: string;
  price: number;
  features: string[];
}

export const generateBackendData = () => {
  const featureSet = new Map<string, GeneratedFeatureKey>();
  const plans: GeneratedPlan[] = [];

  for (const plan of pricingPlans) {
    const planFeatures: string[] = [];

    for (const group of plan.featureGroups ?? []) {
      for (const feature of group.features ?? []) {
        const key =
          group.group.toLowerCase().replace(/\s+/g, "-") +
          ":" +
          feature.toLowerCase().replace(/\s+/g, "-");

        if (!featureSet.has(key)) {
          featureSet.set(key, {
            key,
            label: feature,
            group: group.group,
          });
        }

        planFeatures.push(key);
      }
    }

    plans.push({
      name: plan.title,
      price: typeof plan.price === "string"
        ? Number(plan.price.replace(/[^0-9]/g, "")) || 0
        : plan.price,
      features: planFeatures,
    });
  }

  return {
    features: [...featureSet.values()],
    plans,
  };
};
