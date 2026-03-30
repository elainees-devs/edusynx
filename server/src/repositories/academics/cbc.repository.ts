// server/src/repositories/academics/cbc.repository.ts


import { Types } from "mongoose";
import {
  AssessmentModel,
  LearningOutcomeModel,
  SubStrandModel,
  StrandModel,
  CompetencyModel,
} from "../../models";
import {
  IAssessment,
  ILearningOutcome,
  ISubStrand,
  IStrand,
  ICompetency,
} from "../../types";
import { AppError, normalizeId } from "../../utils";
import { PaginationOptions } from "../../shared/pagination";

// Recursively convert all _id fields to string in an object or array
function deepMapId(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(deepMapId);
  }
  if (obj && typeof obj === 'object') {
    const result: any = {};
    for (const key of Object.keys(obj)) {
      if (key === '_id' && obj[key] && typeof obj[key] !== 'string') {
        result[key] = obj[key].toString();
      } else {
        result[key] = deepMapId(obj[key]);
      }
    }
    return result;
  }
  return obj;
}

export class CBCRepository {
    async getStrands(options?: PaginationOptions): Promise<IStrand[]> {
      const { skip = 0, limit = 10 } = options || {};
      try {
        let query = StrandModel.find().skip(skip);
        if (limit > 0) query = query.limit(limit);
        const docs = await query.exec();
        return docs.map(d => deepMapId(d.toObject()));
      } catch (error) {
        throw new AppError(`Failed to fetch strands: ${(error as Error).message}`, 500);
      }
    }

    async getSubStrands(options?: PaginationOptions): Promise<ISubStrand[]> {
      const { skip = 0, limit = 10 } = options || {};
      try {
        let query = SubStrandModel.find().skip(skip);
        if (limit > 0) query = query.limit(limit);
        const docs = await query.exec();
        return docs.map(d => deepMapId(d.toObject()));
      } catch (error) {
        throw new AppError(`Failed to fetch sub-strands: ${(error as Error).message}`, 500);
      }
    }

    async getLearningOutcomes(options?: PaginationOptions): Promise<ILearningOutcome[]> {
      const { skip = 0, limit = 10 } = options || {};
      try {
        let query = LearningOutcomeModel.find().skip(skip);
        if (limit > 0) query = query.limit(limit);
        const docs = await query.exec();
        return docs.map(d => deepMapId(d.toObject()));
      } catch (error) {
        throw new AppError(`Failed to fetch learning outcomes: ${(error as Error).message}`, 500);
      }
    }

    async getAssessments(options?: PaginationOptions): Promise<IAssessment[]> {
      const { skip = 0, limit = 10 } = options || {};
      try {
        let query = AssessmentModel.find().skip(skip);
        if (limit > 0) query = query.limit(limit);
        const docs = await query.exec();
        return docs.map(d => deepMapId(d.toObject()));
      } catch (error) {
        throw new AppError(`Failed to fetch assessments: ${(error as Error).message}`, 500);
      }
    }
  // --- Competency CRUD ---

  async createCompetency(data: ICompetency): Promise<ICompetency> {
    try {
      const competency = new CompetencyModel(data);
      const saved = await competency.save();
      return deepMapId(saved.toObject());
    } catch (error) {
      throw new AppError(`Failed to create competency: ${(error as Error).message}`, 500);
    }
  }


  async getCompetencyById(id: string): Promise<ICompetency | null> {
    try {
      const doc = await CompetencyModel.findById(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to get competency ${id}: ${(error as Error).message}`, 500);
    }
  }


  async getCompetencies(options?: PaginationOptions): Promise<ICompetency[]> {
    const { skip = 0, limit = 10 } = options || {};
    try {
      let query = CompetencyModel.find().skip(skip);
      if (limit > 0) query = query.limit(limit);
      const docs = await query.exec();
      return docs.map(d => deepMapId(d.toObject()));
    } catch (error) {
      throw new AppError(`Failed to fetch competencies: ${(error as Error).message}`, 500);
    }
  }


  async updateCompetency(id: string, updates: Partial<ICompetency>): Promise<ICompetency | null> {
    try {
      const doc = await CompetencyModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      ).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to update competency ${id}: ${(error as Error).message}`, 500);
    }
  }


  async deleteCompetency(id: string): Promise<ICompetency | null> {
    try {
      const doc = await CompetencyModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to delete competency ${id}: ${(error as Error).message}`, 500);
    }
  }


  // --- Strand CRUD ---
  async createStrand(data: IStrand): Promise<IStrand> {
    try {
      const strand = new StrandModel(data);
      const saved = await strand.save();
      return deepMapId(saved.toObject());
    } catch (error) {
      throw new AppError(`Failed to create strand: ${(error as Error).message}`, 500);
    }
  }

  async getStrandById(id: string): Promise<IStrand | null> {
    try {
      const doc = await StrandModel.findById(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to get strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async updateStrand(id: string, updates: Partial<IStrand>): Promise<IStrand | null> {
    try {
      const doc = await StrandModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      ).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to update strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteStrand(id: string): Promise<IStrand | null> {
    try {
      const doc = await StrandModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to delete strand ${id}: ${(error as Error).message}`, 500);
    }
  }


  // --- SubStrand CRUD ---
  async createSubStrand(data: ISubStrand): Promise<ISubStrand> {
    try {
      const subStrand = new SubStrandModel(data);
      const saved = await subStrand.save();
      return deepMapId(saved.toObject());
    } catch (error) {
      throw new AppError(`Failed to create sub-strand: ${(error as Error).message}`, 500);
    }
  }

  async getSubStrandById(id: string): Promise<ISubStrand | null> {
    try {
      const doc = await SubStrandModel.findById(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to get sub-strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async updateSubStrand(id: string, updates: Partial<ISubStrand>): Promise<ISubStrand | null> {
    try {
      const doc = await SubStrandModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      ).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to update sub-strand ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteSubStrand(id: string): Promise<ISubStrand | null> {
    try {
      const doc = await SubStrandModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to delete sub-strand ${id}: ${(error as Error).message}`, 500);
    }
  }


  // --- LearningOutcome CRUD ---
  async createLearningOutcome(data: ILearningOutcome): Promise<ILearningOutcome> {
    try {
      const lo = new LearningOutcomeModel(data);
      const saved = await lo.save();
      return deepMapId(saved.toObject());
    } catch (error) {
      throw new AppError(`Failed to create learning outcome: ${(error as Error).message}`, 500);
    }
  }

  async getLearningOutcomeById(id: string): Promise<ILearningOutcome | null> {
    try {
      const doc = await LearningOutcomeModel.findById(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to get learning outcome ${id}: ${(error as Error).message}`, 500);
    }
  }

  async updateLearningOutcome(id: string, updates: Partial<ILearningOutcome>): Promise<ILearningOutcome | null> {
    try {
      const doc = await LearningOutcomeModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      ).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to update learning outcome ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteLearningOutcome(id: string): Promise<ILearningOutcome | null> {
    try {
      const doc = await LearningOutcomeModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to delete learning outcome ${id}: ${(error as Error).message}`, 500);
    }
  }

  // --- Assessment CRUD ---
  async createAssessment(data: IAssessment): Promise<IAssessment> {
    try {
      const assessment = new AssessmentModel(data);
      const saved = await assessment.save();
      return deepMapId(saved.toObject());
    } catch (error) {
      throw new AppError(`Failed to create assessment: ${(error as Error).message}`, 500);
    }
  }

  async getAssessmentById(id: string): Promise<IAssessment | null> {
    try {
      const doc = await AssessmentModel.findById(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to get assessment ${id}: ${(error as Error).message}`, 500);
    }
  }

  async updateAssessment(id: string, updates: Partial<IAssessment>): Promise<IAssessment | null> {
    try {
      const doc = await AssessmentModel.findByIdAndUpdate(
        new Types.ObjectId(id),
        updates,
        { new: true }
      ).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to update assessment ${id}: ${(error as Error).message}`, 500);
    }
  }

  async deleteAssessment(id: string): Promise<IAssessment | null> {
    try {
      const doc = await AssessmentModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
      return doc ? deepMapId(doc.toObject()) : null;
    } catch (error) {
      throw new AppError(`Failed to delete assessment ${id}: ${(error as Error).message}`, 500);
    }
  }
}
