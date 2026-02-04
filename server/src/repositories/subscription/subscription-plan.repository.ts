// server/src/repositories/subscription/subscription-plan.repository.ts
import { SubscriptionPlanModel } from "../../models";
import { ISubscriptionPlan } from "../../types";

export class SubscriptionPlanRepository {
  /**
   * Create new subscription plan
   */
  async createPlan(data: Partial<ISubscriptionPlan>): Promise<ISubscriptionPlan> {
    const plan = new SubscriptionPlanModel({
      ...data,
    });
    return await plan.save();
  }

  /**
   * Update plan by ID
   */
  async updatePlanById(
    id: string,
    updates: Partial<ISubscriptionPlan>
  ): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  /**
   * Find plan by ID
   */
  async findPlanById(id: string): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findById(id).exec();
  }

  /**
   * Find plan by name (e.g. "Basic", "Pro", "Enterprise")
   */
  async findPlanByName(name: string): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findOne({ name }).exec();
  }

  /**
   * Fetch all subscription plans
   */
  async findAllPlans(): Promise<ISubscriptionPlan[]> {
    return await SubscriptionPlanModel.find().exec();
  }

  /**
   * Delete plan by ID
   */
  async deletePlanById(id: string): Promise<ISubscriptionPlan | null> {
    return await SubscriptionPlanModel.findByIdAndDelete(id).exec();
  }

  /**
   * Delete all plans (be careful—affects subscriptions!)
   */
  async deleteAllPlans(): Promise<void> {
    await SubscriptionPlanModel.deleteMany({}).exec();
  }

  /**
   * Pagination: return plans with skip/limit
   */
  async findMany({ skip = 0, limit = 10 }) {
    return SubscriptionPlanModel.find().skip(skip).limit(limit);
  }

  /**
   * Count total plans
   */
  async countAll() {
    return SubscriptionPlanModel.countDocuments();
  }
}
