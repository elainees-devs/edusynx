//src/routes/login.route.ts
import { Router } from "express";
import { loginSchema } from "../validation/login.schema";
import { LoginController } from "../controllers";
import { validate } from "../middlewares/validate";


const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post("/login", validate(loginSchema), loginController.loginUser);

export { loginRouter };
