import { Router } from "express";
import { SubscriptionController } from "../controllers";
import { validate } from "../middlewares/validate";
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from "../validation/subscription.schema";

const subscriptionRouter = Router();
const subscriptionController = new SubscriptionController();

/**
 * @swagger
 * /api/v1/subscriptions:
 *   post:
 *     summary: Create a new subscription for a school
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SubscriptionCreate'
 *     responses:
 *       201:
 *         description: Subscription created successfully
 *       400:
 *         description: Validation error
 */
subscriptionRouter.post(
  "/",
  validate(createSubscriptionSchema),
  subscriptionController.createSubscription
);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   get:
 *     summary: Get paginated list of subscriptions
 *     tags: [Subscriptions]
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
 *         description: Paginated list of subscriptions
 */
subscriptionRouter.get("/", subscriptionController.getSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/all:
 *   get:
 *     summary: Get all subscriptions without pagination
 *     tags: [Subscriptions]
 *     responses:
 *       200:
 *         description: List of all subscriptions
 */
subscriptionRouter.get("/all", subscriptionController.getAllSubscriptions);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   get:
 *     summary: Get a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription found
 *       404:
 *         description: Subscription not found
 */
subscriptionRouter.get("/:id", subscriptionController.getSubscriptionById);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   patch:
 *     summary: Update a subscription by ID
 *     tags: [Subscriptions]
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
 *             $ref: '#/components/schemas/SubscriptionUpdate'
 *     responses:
 *       200:
 *         description: Subscription updated
 *       404:
 *         description: Subscription not found
 */
subscriptionRouter.patch(
  "/:id",
  validate(updateSubscriptionSchema),
  subscriptionController.updateSubscription
);

/**
 * @swagger
 * /api/v1/subscriptions/{id}:
 *   delete:
 *     summary: Delete a subscription by ID
 *     tags: [Subscriptions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Subscription deleted
 *       404:
 *         description: Subscription not found
 */
subscriptionRouter.delete("/:id", subscriptionController.deleteSubscription);

/**
 * @swagger
 * /api/v1/subscriptions:
 *   delete:
 *     summary: Delete all subscriptions
 *     tags: [Subscriptions]
 *     responses:
 *       204:
 *         description: All subscriptions deleted
 */
subscriptionRouter.delete("/", subscriptionController.deleteAllSubscriptions);

export { subscriptionRouter };
