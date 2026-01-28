// server/src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GuardianModel, TeacherModel, UserModel } from "../models";
import { IGuardian, ITeacher, IBaseUser } from "../types/people/user.types";
import { UserRole } from "../types/enum/enum";
import { ILoginBase } from "../types/common/auth-context.types";

/**
 * Supported user types attached to req.user
 */
type AuthenticatedUser = IGuardian | ITeacher | IBaseUser;

/**
 * Allow one or many roles
 */
type Role = UserRole | UserRole[];

/**
 * Authentication & authorization middleware
 */
export const authenticateUser = (roles: Role) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(401).send("No token provided");
        return;
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        res.status(401).send("Malformed authorization header");
        return;
      }

      const payload = jwt.verify(token, process.env.JWT_SECRET as string) as any;

      // normalize roles
      const allowedRoles = Array.isArray(roles) ? roles : [roles];

      if (!payload.role || !allowedRoles.includes(payload.role)) {
        console.log("Payload role:", payload.role);
        console.log("Allowed roles:", allowedRoles);
        res.status(403).send("User not authorized for this role");
        return;
      }

      // fetch user based on role
      let user: AuthenticatedUser | null = null;
      switch (payload.role) {
        case UserRole.GUARDIAN:
          user = await GuardianModel.findById(payload.userId).populate("school") as IGuardian;
          break;
        case UserRole.TEACHER:
          user = await TeacherModel.findById(payload.userId).populate(["school", "class"]) as ITeacher;
          break;
        case UserRole.SCHOOL_ADMIN:
        case UserRole.PRINCIPAL:
        case UserRole.ACCOUNTANT:
        case UserRole.SUPER_ADMIN:
          user = await UserModel.findById(payload.userId).populate("school") as IBaseUser;
          break;
      }

      if (!user) {
        res.status(403).send("User not found or not authorized");
        return;
      }

      req.user = user;
      req.loginInfo = {
        loginTime: new Date(),
        ipAddress: req.ip,
        deviceInfo: req.headers["user-agent"] || undefined,
      };

      next();
    } catch (err) {
      console.error(err);
      res.status(401).send("Invalid or expired token");
      return;
    }
  };
};