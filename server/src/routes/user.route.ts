// src/routes/users.route.ts
import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createUserSchema, updateUserSchema } from "../validation/user.schema";
import { UserController } from "../controllers";

const userRouter = Router();
const userController = new UserController();

userRouter.post("/", validate(createUserSchema), userController.createUser);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.put("/:id", validate(updateUserSchema), userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);

export default userRouter;
