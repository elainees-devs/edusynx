// server/src/controllers/people/guardian.controller.ts
import { Request, Response } from "express";
import { GuardianRepository } from "../../repositories";
import { handleAsync } from "../../utils";


const guardianRepo = new GuardianRepository();

export class GuardianController {
    // 1. Method to generate family number and create a guardian
  generateFamilyNumberAndcreateGuardian = handleAsync(async (req: Request, res: Response) => {
    const guardian = await guardianRepo.generateFamilyNumberAndCreateGuardian(req.body);
    res.status(201).json(guardian);
  });

    // 2. Method to get all guardians
  getAllGuardians = handleAsync(async (_req: Request, res: Response) => {
    const guardians = await guardianRepo.findAllGuardians();
    res.status(200).json(guardians);
  });
}
