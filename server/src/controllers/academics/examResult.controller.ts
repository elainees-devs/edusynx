import { Request, Response } from "express";
import { AcademicResultService } from "../../services/academics/academic.result.service";
import { handleAsync } from "../../utils/handleAsync";

const resultService = new AcademicResultService();

export class ExamResultController {
  enterBulkResults = handleAsync(async (req: Request, res: Response) => {
    const { examId, results } = req.body;
    const stats = await resultService.enterBulkResults(examId, results);
    res.status(200).json({ message: "Results processed", stats });
  });

  getResultsByExam = handleAsync<{ examId: string }>(async (req, res) => {
    const results = await resultService.getResultsByExam(req.params.examId);
    res.json(results);
  });

  approveResults = handleAsync<{ examId: string }>(async (req, res) => {
    const userId = (req as any).user?._id;
    const message = await resultService.approveResults(req.params.examId, userId);
    res.json(message);
  });

  getStudentResults = handleAsync<{ studentId: string }>(async (req, res) => {
      const results = await resultService.getStudentPerformance(req.params.studentId);
      res.json(results);
  });
}
