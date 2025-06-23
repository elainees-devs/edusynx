// src/middleware/tenant.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SchoolRepository } from "../repositories/school.repository";

const schoolRepo = new SchoolRepository();

export async function tenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { slug } = req.params;

  if (!slug) {
    return res.status(400).json({ message: "School slug is required in the URL." });
  }

  try {
    const school = await schoolRepo.findBySlug(slug);

    if (!school) {
      return res.status(404).json({ message: "School not found or not active." });
    }

    req.tenant = school;
    next();
  } catch (error) {
    console.error("Tenant lookup error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}
