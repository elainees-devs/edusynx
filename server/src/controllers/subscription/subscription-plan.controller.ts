// server/src/controllers/subscription/subscription-plan.controller.ts
import { Request, Response } from "express";
import { SubscriptionPlanRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";


const planRepo = new SubscriptionPlanRepository();

export class SubscriptionPlanController {
  /**
   * Create a new subscription plan
   * POST /subscription-plans
   */
  createPlan = handleAsync(async (req: Request, res: Response) => {
    const newPlan = await planRepo.createPlan(req.body);
    res.status(201).json(newPlan);
  });

  /**
   * Get subscription plan by ID
   * GET /subscription-plans/:id
   */
  getPlanById = handleAsync<{ id: string }>(async (req, res) => {
    const plan = await planRepo.findPlanById(req.params.id);
    if (!plan) throw new AppError("Subscription plan not found", 404);
    res.json(plan);
  });

  /**
   * Get all subscription plans (paginated)
   * GET /subscription-plans?page=1&limit=10
   */
  getPlans = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const [plans, total] = await Promise.all([
      planRepo.findMany({ skip, limit } as PaginationOptions),
      planRepo.countAll(),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: plans,
    });
  });

  /**
   * Get all plans without pagination
   * GET /subscription-plans/all
   */
  getAllPlans = handleAsync(async (_req: Request, res: Response) => {
    const plans = await planRepo.findAllPlans();
    res.json(plans);
  });

  /**
   * Update subscription plan by ID
   * PUT /subscription-plans/:id
   */
  updatePlan = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updatedPlan = await planRepo.updatePlanById(req.params.id, req.body);
    if (!updatedPlan) throw new AppError("Subscription plan not found", 404);
    res.json(updatedPlan);
  });

  /**
   * Delete subscription plan by ID
   * DELETE /subscription-plans/:id
   */
  deletePlan = handleAsync<{ id: string }>(async (req, res) => {
    const deletedPlan = await planRepo.deletePlanById(req.params.id);
    if (!deletedPlan) throw new AppError("Subscription plan not found", 404);
    res.status(204).send();
  });

  /**
   * Delete all plans
   * DELETE /subscription-plans
   */
  deleteAllPlans = handleAsync(async (_req: Request, res: Response) => {
    await planRepo.deleteAllPlans();
    res.status(204).send();
  });

  /**
   * Find plan by name
   * GET /subscription-plans/name/:name
   */
  getPlanByName = handleAsync<{ name: string }>(async (req, res) => {
    const plan = await planRepo.findPlanByName(req.params.name);
    if (!plan) throw new AppError("Subscription plan not found", 404);
    res.json(plan);
  });
}
