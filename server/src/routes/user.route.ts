// server/src/routes/user.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../validation/user.schema";
import { UserController } from "../controllers";

const userRouter = Router();
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage application users
 */

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserCreate'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 */
userRouter.post("/", validate(createUserSchema), userController.createUser);

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
userRouter.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
userRouter.get("/:id", userController.getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */
userRouter.put("/:id", validate(updateUserSchema), userController.updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       204:
 *         description: User deleted
 */
userRouter.delete("/:id", userController.deleteUser);

/**
 * @swagger
 * /api/v1/users:
 *   delete:
 *     summary: Delete all users
 *     tags: [Users]
 *     responses:
 *       204:
 *         description: All users deleted
 */
userRouter.delete("/", userController.deleteAllUsers);

export { userRouter };
