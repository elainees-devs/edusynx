// server/src/repositories/academics/cbc.repository.ts
import { Types } from "mongoose";
import {
  AssessmentModel,
  LearningOutcomeModel,
  SubStrandModel,
  StrandModel,
  CompetencyModel,
  AssessmentTemplateModel,
  StudentAssessmentModel,
} from "../../models";
import {
  IAssessment,
  ILearningOutcome,
  ISubStrand,
  IStrand,
  ICompetency,
  IAssessmentTemplate,
  IStudentAssessment,
} from "../../types";
import {
  CreateAssessmentDTO,
  CreateLearningOutcomeDTO,
  CreateSubStrandDTO,
  CreateStrandDTO,
  CreateCompetencyDTO,
  CreateAssessmentTemplateDTO,
  CreateStudentAssessmentDTO,
} from "../../dto/cbc.dto";
import { AppError } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";

export class CBCRepository {
  // --- Generic pagination helper ---
  private async findWithPagination<T>(query: any, options?: PaginationOptions): Promise<T[]> {
    const { skip = 0, limit = 10 } = options || {};
    let q = query.skip(skip);
    if (limit > 0) q = q.limit(limit);
    return await q.exec();
  }

  // --- Generic getById helper ---
  private async findByIdOrThrow<T>(model: any, id: string, typeName: string): Promise<T | null> {
    try {
      return await model.findById(new Types.ObjectId(id)).exec();
    } catch (error) {
      throw new AppError(`Failed to get ${typeName} ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- Competency CRUD ---
  async createCompetency(data: CreateCompetencyDTO): Promise<ICompetency> {
    try {
      return await new CompetencyModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create competency: ${(error as Error).message}`, 500);
    }
  }

  async getCompetencyById(id: string): Promise<ICompetency | null> {
    return this.findByIdOrThrow<ICompetency>(CompetencyModel, id, "competency");
  }

  async getCompetencies(options?: PaginationOptions): Promise<ICompetency[]> {
    return this.findWithPagination<ICompetency>(CompetencyModel.find(), options);
  }

  async updateCompetency(id: string, updates: Partial<CreateCompetencyDTO>): Promise<ICompetency | null> {
    try {
      return await CompetencyModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update competency ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteCompetency(id: string): Promise<ICompetency | null> {
    try {
      return await CompetencyModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete competency ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- Strand CRUD ---
  async createStrand(data: CreateStrandDTO): Promise<IStrand> {
    try {
      return await new StrandModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create strand: ${(error as Error).message}`, 500);
    }
  }

  async getStrandById(id: string): Promise<IStrand | null> {
    return this.findByIdOrThrow<IStrand>(StrandModel, id, "strand");
  }

  async getStrands(options?: PaginationOptions): Promise<IStrand[]> {
    return this.findWithPagination<IStrand>(StrandModel.find(), options);
  }

  async updateStrand(id: string, updates: Partial<CreateStrandDTO>): Promise<IStrand | null> {
    try {
      return await StrandModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteStrand(id: string): Promise<IStrand | null> {
    try {
      return await StrandModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- SubStrand CRUD ---
  async createSubStrand(data: CreateSubStrandDTO): Promise<ISubStrand> {
    try {
      return await new SubStrandModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create sub-strand: ${(error as Error).message}`, 500);
    }
  }

  async getSubStrandById(id: string): Promise<ISubStrand | null> {
    return this.findByIdOrThrow<ISubStrand>(SubStrandModel, id, "sub-strand");
  }

  async getSubStrands(options?: PaginationOptions): Promise<ISubStrand[]> {
    return this.findWithPagination<ISubStrand>(SubStrandModel.find(), options);
  }

  async updateSubStrand(id: string, updates: Partial<CreateSubStrandDTO>): Promise<ISubStrand | null> {
    try {
      return await SubStrandModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update sub-strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteSubStrand(id: string): Promise<ISubStrand | null> {
    try {
      return await SubStrandModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete sub-strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- LearningOutcome CRUD ---
  async createLearningOutcome(data: CreateLearningOutcomeDTO): Promise<ILearningOutcome> {
    try {
      return await new LearningOutcomeModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create learning outcome: ${(error as Error).message}`, 500);
    }
  }

  async getLearningOutcomeById(id: string): Promise<ILearningOutcome | null> {
    return this.findByIdOrThrow<ILearningOutcome>(LearningOutcomeModel, id, "learning outcome");
  }

  async getLearningOutcomes(options?: PaginationOptions): Promise<ILearningOutcome[]> {
    return this.findWithPagination<ILearningOutcome>(LearningOutcomeModel.find(), options);
  }

  async updateLearningOutcome(id: string, updates: Partial<CreateLearningOutcomeDTO>): Promise<ILearningOutcome | null> {
    try {
      return await LearningOutcomeModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update learning outcome ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteLearningOutcome(id: string): Promise<ILearningOutcome | null> {
    try {
      return await LearningOutcomeModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete learning outcome ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- Assessment CRUD ---
  async createAssessment(data: CreateAssessmentDTO): Promise<IAssessment> {
    try {
      return await new AssessmentModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create assessment: ${(error as Error).message}`, 500);
    }
  }

  async getAssessmentById(id: string): Promise<IAssessment | null> {
    return this.findByIdOrThrow<IAssessment>(AssessmentModel, id, "assessment");
  }

  async getAssessments(options?: PaginationOptions): Promise<IAssessment[]> {
    return this.findWithPagination<IAssessment>(AssessmentModel.find(), options);
  }

  async updateAssessment(id: string, updates: Partial<CreateAssessmentDTO>): Promise<IAssessment | null> {
    try {
      return await AssessmentModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update assessment ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteAssessment(id: string): Promise<IAssessment | null> {
    try {
      return await AssessmentModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete assessment ${id}: ${(error as Error).message}`, 500);
    }
  }

  //--Assessment Template CRUD --
  async createAssessmentTemplate(data: CreateAssessmentTemplateDTO): Promise<IAssessmentTemplate> {
    try {
      const template = new AssessmentTemplateModel(data);
      return await template.save();
    } catch (error) {
      throw new AppError(`Failed to create assessment template: ${(error as Error).message}`, 500);
    }
  }

  async getAssessmentTemplateById(id: string): Promise<IAssessmentTemplate | null> {
    try {
      return await AssessmentTemplateModel.findById(id).exec();
    } catch (error) {
      throw new AppError(`Failed to get assessment template ${id}: ${(error as Error).message}`, 500);
    }
  }

  async getAssessmentTemplates(): Promise<IAssessmentTemplate[]> {
    try {
      return await AssessmentTemplateModel.find().exec();
    } catch (error) {
      throw new AppError(`Failed to fetch assessment templates: ${(error as Error).message}`, 500);
    }
  }

  async updateAssessmentTemplate(id: string, updates: Partial<CreateAssessmentTemplateDTO>): Promise<IAssessmentTemplate | null> {
    try {
      return await AssessmentTemplateModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update assessment template ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteAssessmentTemplate(id: string): Promise<IAssessmentTemplate | null> {
    try {
      return await AssessmentTemplateModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete assessment template ${id}: ${(error as Error).message}`, 500);
    }
  }

  // -- Student Assessment CRUD --
  async createStudentAssessment(data: CreateStudentAssessmentDTO): Promise<IStudentAssessment> {
    try {
      return await new StudentAssessmentModel(data).save();
    } catch (error) {
      throw new AppError(`Failed to create student assessment: ${(error as Error).message}`, 500);
    }
  }

  async getStudentAssessmentById(id: string): Promise<IStudentAssessment | null> {
    return this.findByIdOrThrow<IStudentAssessment>(StudentAssessmentModel, id, "student assessment");
  }

  async getStudentAssessments(options?: PaginationOptions): Promise<IStudentAssessment[]> {
    return this.findWithPagination<IStudentAssessment>(StudentAssessmentModel.find(), options);
  }

  async updateStudentAssessment(id: string, updates: Partial<CreateStudentAssessmentDTO>): Promise<IStudentAssessment | null> {
    try {
      return await StudentAssessmentModel.findByIdAndUpdate(id, updates, { new: true }).exec();
    } catch (error) {
      throw new AppError(`Failed to update student assessment ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteStudentAssessment(id: string): Promise<IStudentAssessment | null> {
    try {
      return await StudentAssessmentModel.findByIdAndDelete(id).exec();
    } catch (error) {
      throw new AppError(`Failed to delete student assessment ${id}: ${(error as Error).message}`, 500);
    }
  }
}