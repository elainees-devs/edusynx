// server/src/controller/subscription/subscription.controller.ts
import { Request, Response } from "express";
import { SubscriptionRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";


const subscriptionRepo = new SubscriptionRepository();

export class SubscriptionController {
  /**
   * Create a new subscription
   * POST /subscriptions
   */
  createSubscription = handleAsync(async (req: Request, res: Response) => {
    const newSubscription = await subscriptionRepo.createSubscription(req.body);
    res.status(201).json(newSubscription);
  });

  /**
   * Get subscription by ID
   * GET /subscriptions/:id
   */
  getSubscriptionById = handleAsync<{ id: string }>(async (req, res) => {
    const subscription = await subscriptionRepo.findSubscriptionById(req.params.id);
    if (!subscription) throw new AppError("Subscription not found", 404);
    res.json(subscription);
  });

  /**
   * Get subscription by school ID
   * GET /subscriptions/school/:schoolId
   */
  getSubscriptionBySchool = handleAsync<{ schoolId: string }>(async (req, res) => {
    const subscription = await subscriptionRepo.findBySchoolId(req.params.schoolId);
    if (!subscription) throw new AppError("Subscription not found for this school", 404);
    res.json(subscription);
  });

  /**
   * Get active subscription for a school
   * GET /subscriptions/school/:schoolId/active
   */
  getActiveSubscription = handleAsync<{ schoolId: string }>(async (req, res) => {
    const subscription = await subscriptionRepo.findActiveSubscription(req.params.schoolId);
    if (!subscription) throw new AppError("No active subscription found for this school", 404);
    res.json(subscription);
  });

  /**
   * Get all subscriptions (paginated)
   * GET /subscriptions?page=1&limit=10
   */
  getSubscriptions = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [subscriptions, total] = await Promise.all([
      subscriptionRepo.findMany({ skip, limit } as PaginationOptions),
      subscriptionRepo.countAll(),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: subscriptions,
    });
  });

  /**
   * Get all subscriptions without pagination
   * GET /subscriptions/all
   */
  getAllSubscriptions = handleAsync(async (_req: Request, res: Response) => {
    const subscriptions = await subscriptionRepo.findAllSubscriptions();
    res.json(subscriptions);
  });

  /**
   * Update subscription by ID
   * PUT /subscriptions/:id
   */
  updateSubscription = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedSubscription = await subscriptionRepo.updateSubscriptionById(req.params.id, req.body);
    if (!updatedSubscription) throw new AppError("Subscription not found", 404);
    res.json(updatedSubscription);
  });

  /**
   * Delete subscription by ID
   * DELETE /subscriptions/:id
   */
  deleteSubscription = handleAsync<{ id: string }>(async (req, res) => {
    const deletedSubscription = await subscriptionRepo.deleteSubscriptionById(req.params.id);
    if (!deletedSubscription) throw new AppError("Subscription not found", 404);
    res.status(204).send();
  });

  /**
   * Delete all subscriptions
   * DELETE /subscriptions
   */
  deleteAllSubscriptions = handleAsync(async (_req: Request, res: Response) => {
    await subscriptionRepo.deleteAllSubscriptions();
    res.status(204).send();
  });
}
