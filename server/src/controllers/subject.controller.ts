import { SubjectRepository } from "../repositories/subject.repository";
import { AppError } from "../utils/AppError";
import { handleAsync } from "../utils/handleAsync";

const subjectRepo = new SubjectRepository();

export class SubjectController {
  createSubject = handleAsync(async (req, res) => {
    const subject = await subjectRepo.createSubject(req.body);
    res.status(201).json(subject);
  });

  getSubjectsBySchool = handleAsync(async (req, res) => {
    const subjects = await subjectRepo.getSubjectsBySchool(req.params.schoolId);
    res.json(subjects);
  });

  getSubjectById = handleAsync(async (req, res) => {
    const subject = await subjectRepo.getSubjectById(req.params.id);
    if (!subject) throw new AppError("Subject not found", 404);
    res.json(subject);
  });

  updateSubject = handleAsync(async (req, res) => {
    const updatedSubject = await subjectRepo.updateSubject(req.params.id, req.body);
    if (!updatedSubject) throw new AppError("Subject not found", 404);
    res.json(updatedSubject);
  });

  deleteSubject = handleAsync(async (req, res) => {
    const deletedSubject = await subjectRepo.deleteSubject(req.params.id);
    if (!deletedSubject) throw new AppError("Subject not found", 404);
    res.status(204).send();
  });
}
