// server/src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GuardianModel, StaffModel, UserModel } from "../models";
import { IGuardian, ITeacher, IBaseUser } from "../types/people/user.types";
import { IStaff } from "../types/people/staff.types";
import { UserRole } from "../types/enum/enum";
import { ILoginBase } from "../types/common/auth-context.types";

/**
 * Supported user types attached to req.user
 */
type AuthenticatedUser = IGuardian | ITeacher | IBaseUser | IStaff;

/**
 * Allow one or many roles. Empty/undefined means all authenticated roles.
 */
type Role = UserRole | UserRole[] | undefined;

/**
 * Authentication & authorization middleware
 */
export const authenticateUser = (roles?: Role) => {
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

      const allowedRoles = roles
        ? Array.isArray(roles) ? roles : [roles]
        : Object.values(UserRole);

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
          user = await StaffModel.findById(payload.userId).populate(["school", "department"]) as IStaff;
          break;
        case UserRole.DEPUTY_PRINCIPAL:
        case UserRole.SCHOOL_ADMIN:
        case UserRole.PRINCIPAL:
        case UserRole.ACCOUNTANT:
          user = await StaffModel.findById(payload.userId).populate("school") as IStaff;
          break;
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