// server/src/utils/generateFeatures.ts
import { pricingPlans } from "../constants/pricingPlans";
import { FEATURE_KEYS } from "../constants/features";

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

const FEATURE_DISPLAY_MAP: Record<string, string> = {
  "Student Management": FEATURE_KEYS.STUDENT_MANAGEMENT,
  "Attendance Tracking": FEATURE_KEYS.ATTENDANCE_MANAGEMENT,
  "Manual Invoicing": FEATURE_KEYS.MANUAL_INVOICING,
  "Basic Reports": FEATURE_KEYS.BASIC_REPORTS,
  "M-Pesa Integration": FEATURE_KEYS.MPESA_INTEGRATION,
  "Email Alerts": FEATURE_KEYS.EMAIL_ALERTS,
  "SMS Alerts": FEATURE_KEYS.SMS_ALERTS,
  "Real-Time Dashboards": FEATURE_KEYS.REALTIME_DASHBOARDS,
  "Multi-Branch Support": FEATURE_KEYS.MULTI_BRANCH,
  "Advanced Reporting": FEATURE_KEYS.ADVANCED_REPORTS,
  "Custom API Access": FEATURE_KEYS.API_ACCESS,
};

export const generateBackendData = () => {
  const featureSet = new Map<string, GeneratedFeatureKey>();
  const plans: GeneratedPlan[] = [];

  for (const plan of pricingPlans) {
    const planFeatures: string[] = [];

    for (const group of plan.featureGroups ?? []) {
      for (const feature of group.features ?? []) {
        const featureKey = FEATURE_DISPLAY_MAP[feature];
        if (!featureKey) {
          throw new Error(
            `Unknown feature "${feature}" in plan "${plan.title}". ` +
            `Add it to FEATURE_DISPLAY_MAP in generateFeatures.ts`
          );
        }

        if (!featureSet.has(featureKey)) {
          featureSet.set(featureKey, {
            key: featureKey,
            label: feature,
            group: group.group,
          });
        }

        planFeatures.push(featureKey);
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
