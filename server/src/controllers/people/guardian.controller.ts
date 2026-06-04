// server/src/controllers/people/guardian.controller.ts
import { Request, Response } from "express";
import { GuardianRepository } from "../../repositories";
import { AppError, handleAsync } from "../../utils";

const guardianRepo = new GuardianRepository();

export class GuardianController {
  // 1. Method to generate family number and create a guardian
  generateFamilyNumberAndcreateGuardian = handleAsync(
    async (req: Request, res: Response) => {
      const guardian = await guardianRepo.generateFamilyNumberAndCreateGuardian(
        req.body,
      );
      res.status(201).json(guardian);
    },
  );

  // 2. Method to get all guardians
  getAllGuardians = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string)?.toLowerCase() || "";

    // Fetch guardians
    let allGuardians = await guardianRepo.findAllGuardians();

    // Search filter
    if (search) {
      allGuardians = allGuardians.filter(
        (guardian) =>
          guardian.firstName.toLowerCase().includes(search) ||
          guardian.lastName.toLowerCase().includes(search) ||
          guardian.familyNumber.toLowerCase().includes(search),
      );
    }

    const total = allGuardians.length;
    const totalPages = Math.ceil(total / limit);

    // Pagination
    const start = (page - 1) * limit;
    const paginatedGuardians = allGuardians.slice(start, start + limit);

    res.status(200).json({
      data: paginatedGuardians,
      meta: {
        page,
        limit,
        total,
        totalPages,
        search,
      },
    });
  });

  // 3. Search guardians
  searchGuardians = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const result = await guardianRepo.searchGuardians(req.query, {
      skip: (page - 1) * limit,
      limit,
    });

    res.json({
      data: result.data,
      page,
      limit,
      total: result.total,
      totalPages: Math.ceil(result.total / limit),
    });
  });

  // 4. Assign guardians to a student
  assignGuardiansToStudent = handleAsync(async (req, res) => {
    const { guardianIds } = req.body;
    await guardianRepo.assignGuardiansToStudent(req.params.studentId, guardianIds);
    res.json({ message: "Guardians assigned to student successfully" });
  });

  // 5. Get family by family number
  getFamilyByFamilyNumber = handleAsync(async (req, res) => {
    const { familyNumber } = req.params;
    const family = await guardianRepo.getFamilyByFamilyNumber(familyNumber);
    res.json(family);
  });

  // 6. Update guardian by ID
  updateGuardianById = handleAsync(async (req, res) => {
    const updatedGuardian = await guardianRepo.updateGuardianById(
      req.params.id,
      req.body,
    );
    if (!updatedGuardian) throw new AppError("Guardian not found", 404);
    res.json(updatedGuardian);
  });
}
