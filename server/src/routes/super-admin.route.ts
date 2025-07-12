// server/src/routes/super-admin.route.ts
import { Router } from "express";
import { SuperAdminController } from "../controllers/super-admin.controller";

const adminRouter = Router();
const superAdminController = new SuperAdminController();


adminRouter.post("/login", superAdminController.login);


adminRouter.post("/signup", superAdminController.createSuperAdmin);

export default adminRouter;
