import { FEATURE_KEYS, type FeatureKey } from "../constants/features";

const validKeys = new Set<string>(Object.values(FEATURE_KEYS));

export function validateFeatureKeys(features: string[], source: string): void {
  const invalid = features.filter((f) => !validKeys.has(f));

  if (invalid.length > 0) {
    throw new Error(
      `Feature validation failed in "${source}":\n` +
        invalid.map((f) => `  "${f}" is not a valid feature key`).join("\n") +
        `\n\nValid keys: ${[...validKeys].join(", ")}`
    );
  }
}
