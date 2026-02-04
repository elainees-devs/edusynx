// server/src/types/subscription/subscription.types.ts

import {Request, Response, NextFunction } from "express";
import { IBaseUser, IGuardian, ITeacher } from "../types";
import { UserModel } from "../models";

type AuthenticatedUser = IBaseUser | ITeacher | IGuardian;

/**
 * Middleware to check if the logged-in user has access to a feature
 * based on their school's subscription plan.
 * @param feature - the feature name to check, e.g., "view-students"
 */
export const hasFeature = (feature: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure req.user exists
      const user = req.user as AuthenticatedUser | undefined;
      if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      // Use _id (exists on all BaseDocument types)
      const userId = user._id.toString();

      // Populate school → subscription → plan
      const dbUser = await UserModel.findById(userId)
        .populate({
          path: "school",
          populate: {
            path: "subscription",
            populate: { path: "planId" },
          },
        })
        .exec();

      if (!dbUser || !dbUser.school) {
        return res.status(403).json({ message: "School not found" });
      }

      // TypeScript-safe access
      const school = dbUser.school as unknown as {
        subscription?: {
          planId?: {
            features: string[];
          };
        };
      };

      if (!school.subscription || !school.subscription.planId) {
        return res.status(403).json({ message: "Subscription not found" });
      }

      const plan = school.subscription.planId;
      if (!plan.features.includes(feature)) {
        return res.status(403).json({ message: "Feature not available in your plan" });
      }

      next();
    } catch (error) {
      console.error("Feature access error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

