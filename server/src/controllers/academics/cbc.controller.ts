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

  getStrands = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const strands = await cbcRepo.getStrands({ skip, limit });
    res.json({ page, limit, data: strands });
  });

    updateStrand = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateStrand(req.params.id, req.body);
      if (!updated) throw new AppError("Strand not found", 404);
      res.json(updated);
    });

    deleteStrand = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteStrand(req.params.id);
      if (!deleted) throw new AppError("Strand not found", 404);
      res.status(204).send();
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

  getSubStrands = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const subStrands = await cbcRepo.getSubStrands({ skip, limit });
    res.json({ page, limit, data: subStrands });
  });

    updateSubStrand = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateSubStrand(req.params.id, req.body);
      if (!updated) throw new AppError("SubStrand not found", 404);
      res.json(updated);
    });

    deleteSubStrand = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteSubStrand(req.params.id);
      if (!deleted) throw new AppError("SubStrand not found", 404);
      res.status(204).send();
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

  getLearningOutcomes = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const learningOutcomes = await cbcRepo.getLearningOutcomes({ skip, limit });
    res.json({ page, limit, data: learningOutcomes });
  });

    updateLearningOutcome = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateLearningOutcome(req.params.id, req.body);
      if (!updated) throw new AppError("Learning Outcome not found", 404);
      res.json(updated);
    });

    deleteLearningOutcome = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteLearningOutcome(req.params.id);
      if (!deleted) throw new AppError("Learning Outcome not found", 404);
      res.status(204).send();
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

  getAssessments = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const assessments = await cbcRepo.getAssessments({ skip, limit });
    res.json({ page, limit, data: assessments });
  });

    updateAssessment = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateAssessment(req.params.id, req.body);
      if (!updated) throw new AppError("Assessment not found", 404);
      res.json(updated);
    });

    deleteAssessment = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteAssessment(req.params.id);
      if (!deleted) throw new AppError("Assessment not found", 404);
      res.status(204).send();
    });

  // --- Assessment Template ---
  createAssessmentTemplate = handleAsync(async (req: Request, res: Response) => {
    const newTemplate = await cbcRepo.createAssessmentTemplate(req.body);
    res.status(201).json(newTemplate);
  });

  getAssessmentTemplateById = handleAsync<{ id: string }>(async (req, res) => {
    const template = await cbcRepo.getAssessmentTemplateById(req.params.id);
    if (!template) throw new AppError("Assessment Template not found", 404);
    res.json(template);
  });

  getAssessmentTemplates = handleAsync(async (req: Request, res: Response) => {
    const templates = await cbcRepo.getAssessmentTemplates();
    res.json(templates);
  });

    updateAssessmentTemplate = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateAssessmentTemplate(req.params.id, req.body);
      if (!updated) throw new AppError("Assessment Template not found", 404);
      res.json(updated);
    });

    deleteAssessmentTemplate = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteAssessmentTemplate(req.params.id);
      if (!deleted) throw new AppError("Assessment Template not found", 404);
      res.status(204).send();
    }); 

  // --- Student Assessment ---
  createStudentAssessment = handleAsync(async (req: Request, res: Response) => {
    const newStudentAssessment = await cbcRepo.createStudentAssessment(req.body);
    res.status(201).json(newStudentAssessment);
  });

  getStudentAssessmentById = handleAsync<{ id: string }>(async (req, res) => {
    const studentAssessment = await cbcRepo.getStudentAssessmentById(req.params.id);
    if (!studentAssessment) throw new AppError("Student Assessment not found", 404);
    res.json(studentAssessment);
  });

  getStudentAssessments = handleAsync(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const studentAssessments = await cbcRepo.getStudentAssessments({ skip, limit });
    res.json({ page, limit, data: studentAssessments });
  });

    updateStudentAssessment = handleAsync<{ id: string }, any, Partial<any>>(async (req, res) => {
      const updated = await cbcRepo.updateStudentAssessment(req.params.id, req.body);
      if (!updated) throw new AppError("Student Assessment not found", 404);
      res.json(updated);
    });

    deleteStudentAssessment = handleAsync<{ id: string }>(async (req, res) => {
      const deleted = await cbcRepo.deleteStudentAssessment(req.params.id);
      if (!deleted) throw new AppError("Student Assessment not found", 404);
      res.status(204).send();
    });
}
