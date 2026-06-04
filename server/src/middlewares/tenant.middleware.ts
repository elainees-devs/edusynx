// src/middleware/tenant.middleware.ts
import { Request, Response, NextFunction } from "express";
import { SchoolRepository } from "../repositories/school-core/school.repository";

const schoolRepo = new SchoolRepository();

export async function tenantMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { slug } = req.params;

  if (!slug) {
    res.status(400).json({ message: "School slug is required in the URL." });
    return;
  }

  try {
    const school = await schoolRepo.findBySlug(slug);

    if (!school) {
      res.status(404).json({ message: "School not found or not active." });
      return;
    }

    req.tenant = school;
    next();
  } catch (error) {
    console.error("Tenant lookup error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}