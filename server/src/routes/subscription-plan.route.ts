// server/src/routes/subscription-plan.route.ts
import { Router } from "express";

import { validate } from "../middlewares/validate";
import { createSubscriptionPlanSchema, updateSubscriptionPlanSchema } from "../validation";
import { SubscriptionPlanController } from "../controllers";



const subscriptionPlanRouter = Router();
const subscriptionPlanController = new SubscriptionPlanController();

/**
 * @swagger
 * /api/v1/subscription-plans:
 *   post:
 *     summary: Create a new subscription plan
 *     tags: [SubscriptionPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionPlanCreate'
 *     responses:
 *       201:
 *         description: Subscription plan created successfully
 *       400:
 *         description: Validation error
 */
subscriptionPlanRouter.post(
  "/",
  validate(createSubscriptionPlanSchema),
  subscriptionPlanController.createPlan
);

/**
 * @swagger
 * /api/v1/subscription-plans:
 *   get:
 *     summary: Get paginated list of subscription plans
 *     tags: [SubscriptionPlans]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated list of subscription plans
 */
subscriptionPlanRouter.get("/", subscriptionPlanController.getPlans);

/**
 * @swagger
 * /api/v1/subscription-plans/all:
 *   get:
 *     summary: Get all subscription plans without pagination
 *     tags: [SubscriptionPlans]
 *     responses:
 *       200:
 *         description: List of all subscription plans
 */
subscriptionPlanRouter.get("/all", subscriptionPlanController.getAllPlans);

/**
 * @swagger
 * /api/v1/subscription-plans/{id}:
 *   get:
 *     summary: Get a subscription plan by ID
 *     tags: [SubscriptionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription plan found
 *       404:
 *         description: Subscription plan not found
 */
subscriptionPlanRouter.get("/:id", subscriptionPlanController.getPlanById);

/**
 * @swagger
 * /api/v1/subscription-plans/{id}:
 *   patch:
 *     summary: Update a subscription plan by ID
 *     tags: [SubscriptionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionPlanUpdate'
 *     responses:
 *       200:
 *         description: Subscription plan updated
 *       404:
 *         description: Subscription plan not found
 */
subscriptionPlanRouter.patch(
  "/:id",
  validate(updateSubscriptionPlanSchema),
  subscriptionPlanController.updatePlan
);

/**
 * @swagger
 * /api/v1/subscription-plans/{id}:
 *   delete:
 *     summary: Delete a subscription plan by ID
 *     tags: [SubscriptionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription plan deleted
 *       404:
 *         description: Subscription plan not found
 */
subscriptionPlanRouter.delete("/:id", subscriptionPlanController.deletePlan);

/**
 * @swagger
 * /api/v1/subscription-plans:
 *   delete:
 *     summary: Delete all subscription plans
 *     tags: [SubscriptionPlans]
 *     responses:
 *       204:
 *         description: All subscription plans deleted
 */
subscriptionPlanRouter.delete("/", subscriptionPlanController.deleteAllPlans);

export { subscriptionPlanRouter };
