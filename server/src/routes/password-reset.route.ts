// server/src/routes/password-reset.route.ts
import express from "express";
import { PasswordResetTokenController } from "../controllers/password-reset.controller";


const resetRouter = express.Router();
const controller = new PasswordResetTokenController();

resetRouter.post("/", controller.createToken);
resetRouter.get("/:token", controller.verifyToken);
resetRouter.patch("/:token/use", controller.markTokenUsed);
resetRouter.delete("/user/:userId", controller.deleteUserTokens);

export default resetRouter;
