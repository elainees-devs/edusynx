// server/src/controllers/academics/cbc.controller.ts
import { Request, Response } from "express";
import { handleAsync } from "../../utils/handleAsync";
import { AppError } from "../../utils/AppError";
import { CBCRepository } from "../../repositories";
import { PaginationOptions } from "../../shared/pagination";

const cbcRepo = new CBCRepository();

export class CBCController {
  // --- Competency ---
  createCompetency = handleAsync(async (req: Request, res: Response) => {
    const newCompetency = await cbcRepo.createCompetency(req.body);
    res.status(201).json(newCompetency);
  });

  getCompetencyById = handleAsync<{ id: string }>(async (req, res) => {
    const competency = await cbcRepo.getCompetencyById(req.params.id);
    if (!competency) throw new AppError("Competency not found", 404);
    res.json(competency);
  });

  getCompetencies = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const competencies = await cbcRepo.getCompetencies({ skip, limit });
    res.json({ page, limit, data: competencies });
  });

  updateCompetency = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
    const updated = await cbcRepo.updateCompetency(req.params.id, req.body);
    if (!updated) throw new AppError("Competency not found", 404);
    res.json(updated);
  });

  deleteCompetency = handleAsync<{ id: string }>(async (req, res) => {
    const deleted = await cbcRepo.deleteCompetency(req.params.id);
    if (!deleted) throw new AppError("Competency not found", 404);
    res.status(204).send();
  });

  // --- Strand ---
  createStrand = handleAsync(async (req: Request, res: Response) => {
    const newStrand = await cbcRepo.createStrand(req.body);
    res.status(201).json(newStrand);
  });

  getStrandById = handleAsync<{ id: string }>(async (req, res) => {
    const strand = await cbcRepo.getStrandById(req.params.id);
    if (!strand) throw new AppError("Strand not found", 404);
    res.json(strand);
  });

  // --- SubStrand ---
  createSubStrand = handleAsync(async (req: Request, res: Response) => {
    const newSubStrand = await cbcRepo.createSubStrand(req.body);
    res.status(201).json(newSubStrand);
  });

  getSubStrandById = handleAsync<{ id: string }>(async (req, res) => {
    const subStrand = await cbcRepo.getSubStrandById(req.params.id);
    if (!subStrand) throw new AppError("SubStrand not found", 404);
    res.json(subStrand);
  });

  // --- Learning Outcome ---
  createLearningOutcome = handleAsync(async (req: Request, res: Response) => {
    const newLO = await cbcRepo.createLearningOutcome(req.body);
    res.status(201).json(newLO);
  });

  getLearningOutcomeById = handleAsync<{ id: string }>(async (req, res) => {
    const lo = await cbcRepo.getLearningOutcomeById(req.params.id);
    if (!lo) throw new AppError("Learning Outcome not found", 404);
    res.json(lo);
  });

  // --- Assessment ---
  createAssessment = handleAsync(async (req: Request, res: Response) => {
    const newAssessment = await cbcRepo.createAssessment(req.body);
    res.status(201).json(newAssessment);
  });

  getAssessmentById = handleAsync<{ id: string }>(async (req, res) => {
    const assessment = await cbcRepo.getAssessmentById(req.params.id);
    if (!assessment) throw new AppError("Assessment not found", 404);
    res.json(assessment);
  });
}
