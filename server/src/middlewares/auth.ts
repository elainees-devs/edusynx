//src/middlewares/auth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { GuardianModel, TeacherModel, UserModel } from "../models";
import { IGuardian, ITeacher, IBaseUser } from "../types/people/user.types";
import { UserRole } from "../types/enum/enum";

type Role = UserRole;

export const authenticateUser = (role: Role) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        const error = new Error("No token provided");
        (error as any).status = 401;
        return next(error);
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        const error = new Error("Malformed authorization header");
        (error as any).status = 401;
        return next(error);
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

      let user: IBaseUser | null = null;

      switch (role) {
        case UserRole.GUARDIAN:
          user = await GuardianModel.findById(decoded.id).populate("school") as IGuardian;
          break;
        case UserRole.TEACHER:
          user = await TeacherModel.findById(decoded.id).populate(["school", "class"]) as ITeacher;
          break;
        case UserRole.SCHOOL_ADMIN:
          user = await UserModel.findById(decoded.id).populate("school");
          break;
        case UserRole.HEADTEACHER:
          user = await UserModel.findById(decoded.id).populate("school") as IBaseUser;
          break;
        case UserRole.ACCOUNTANT:
          user = await UserModel.findById(decoded.id).populate("school") as IBaseUser;
          break;
        default:
          const error = new Error("Unsupported user role");
          (error as any).status = 403;
          return next(error);
      }

      if (!user) {
        const error = new Error(`${role} not found`);
        (error as any).status = 401;
        return next(error);
      }

      req.user = user;
      next();
    } catch (err: any) {
      const error = new Error("Invalid token");
      (error as any).status = 401;
      next(error);
    }
  };
};
