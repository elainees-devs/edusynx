// client/src/utils/cn.ts
import { clsx } from "clsx";

export function cn(...inputs: unknown[]) {
  return clsx(inputs);
}
