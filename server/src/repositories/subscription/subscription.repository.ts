// server/src/repositories/subscription/subscription.repository.ts

import { CreateSubscriptionDTO } from "../../dto";
import { SubscriptionModel } from "../../models";
import { ISubscription } from "../../types";

export class SubscriptionRepository {
  /**
   * Create a new subscription
   */
  async createSubscription(
    data: CreateSubscriptionDTO,
  ): Promise<ISubscription> {
    // Set start date to today
    const startDate = new Date();

    // Calculate end date by adding 'duration' months
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + data.duration); // data.duration in months

    // Merge calculated dates into subscription data
    const subscriptionData = {
      ...data,
      startDate,
      endDate,
    };

    const subscription = new SubscriptionModel(subscriptionData);

    return await subscription.save();
  }

  /**
   * Update subscription by ID
   */
  async updateSubscriptionById(
    id: string,
    updates: Partial<ISubscription>,
  ): Promise<ISubscription | null> {
    return await SubscriptionModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).exec();
  }

  /**
   * Find subscription by ID
   */
  async findSubscriptionById(id: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findById(id).exec();
  }

  /**
   * Get subscription by school ID
   * Useful for attaching subscription to school or validating access
   */
  async findBySchoolId(schoolId: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findOne({ school: schoolId }).exec();
  }

  /**
   * Get active subscription for a school
   */
  async findActiveSubscription(
    schoolId: string,
  ): Promise<ISubscription | null> {
    return await SubscriptionModel.findOne({
      school: schoolId,
      isActive: true,
      endDate: { $gte: new Date() }, // expiration check
    }).exec();
  }

  /**
   * Fetch all subscriptions
   */
  async findAllSubscriptions(): Promise<ISubscription[]> {
    return await SubscriptionModel.find().exec();
  }

  /**
   * Delete subscription by ID
   */
  async deleteSubscriptionById(id: string): Promise<ISubscription | null> {
    return await SubscriptionModel.findByIdAndDelete(id).exec();
  }

  /**
   * Delete all subscription records (careful)
   */
  async deleteAllSubscriptions(): Promise<void> {
    await SubscriptionModel.deleteMany({}).exec();
  }

  /**
   * Pagination support
   */
  async findMany({ skip = 0, limit = 10 }) {
    return SubscriptionModel.find().skip(skip).limit(limit);
  }

  /**
   * Count total subscriptions
   */
  async countAll() {
    return SubscriptionModel.countDocuments();
  }
}
