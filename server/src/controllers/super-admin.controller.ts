// server/src/controllers/super-admin.controller.ts
import { SuperAdminRepository } from "../repositories/super-admin.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRole } from "../types/enum/enum";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export class SuperAdminController {
  private adminRepo = new SuperAdminRepository();

  createSuperAdmin = handleAsync(async (req, res) => {
    const { email, password } = req.body;

    const existingAdmin = await this.adminRepo.findByEmail(email);
    if (existingAdmin) {
      throw new AppError("Super Admin already exists", 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await this.adminRepo.create({
      email,
      password: hashedPassword,
      role: UserRole.SUPER_ADMIN,
    });

    res.status(201).json({
      message: "Super Admin created successfully",
      user: {
        id: newAdmin._id,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  });

  login = handleAsync(async (req, res) => {
    const { email, password } = req.body;

    const admin = await this.adminRepo.findByEmail(email);
    if (!admin || admin.role !== UserRole.SUPER_ADMIN) {
      throw new AppError("Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new AppError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { userId: admin._id.toString(), role: admin.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
    });
  });

  getAll = handleAsync(async (_req, res) => {
    const admins = await this.adminRepo.findAll();
    res.json(admins);
  });

  update = handleAsync(async (req, res) => {
    const updated = await this.adminRepo.update(req.params.id, req.body);
    if (!updated) throw new AppError("Super Admin not found", 404);
    res.json(updated);
  });

  delete = handleAsync(async (req, res) => {
    const deleted = await this.adminRepo.deleteById(req.params.id);
    if (!deleted) throw new AppError("Super Admin not found", 404);
    res.status(204).send();
  });
}
