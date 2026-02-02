// server/src/types/subscription/subscription.types.ts

import { Types } from "mongoose";
import { BaseDocument } from "../common/base.types";
import { ISchool } from "../school/school-core.types";

export interface ISubscriptionPlan extends BaseDocument {
  name: string;
  price: number;
  durationInMonths: number;
  features: string[];
}

export interface ISubscription extends BaseDocument {
  school: Types.ObjectId | ISchool;
  planId: Types.ObjectId | ISubscriptionPlan;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
}
