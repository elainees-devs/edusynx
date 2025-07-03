//src/routes/profile.route.ts
import { Router } from "express";
import { UserRole } from "../types";
import { authenticateUser } from "../middlewares/auth";

const profileRouter = Router()

profileRouter.get("/profile", authenticateUser(UserRole.TEACHER), (req, res) => {
  res.json({
    user: req.user,
    loginInfo: req.loginInfo,
  });
});

export {profileRouter}