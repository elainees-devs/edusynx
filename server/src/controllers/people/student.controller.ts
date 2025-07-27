// server/src/controllers/people/student.controller.ts
import { StudentRepository } from "../../repositories";
import { IGuardian } from "../../types";
import { AppError } from "../../utils/AppError";
import { handleAsync } from "../../utils/handleAsync";


const studentRepo = new StudentRepository();

export class StudentController {
  createStudent = handleAsync(async (req, res) => {
    const student = await studentRepo.createStudent(req.body);
    res.status(201).json(student);
  });

generateAdmissionAndCreateStudent = handleAsync(async (req, res) => {
  const guardian = req.user as IGuardian;
  const student = await studentRepo.generateAdmissionNumberAndCreateStudent(req.body, guardian);
  res.status(201).json(student);
});

  getAllStudents = handleAsync(async (_req, res) => {
    const students = await studentRepo.findAllStudents();
    res.json(students);
  });

  getStudentWithGuardianById = handleAsync(async (req, res) => {
    const student = await studentRepo.findStudentWithGuardianById(req.params.id);
    if (!student) throw new AppError("Student not found", 404);
    res.json(student);
  });

  getStudentNameById = handleAsync(async (req, res) => {
    const name = await studentRepo.findStudentNameById(req.params.id);
    if (!name) throw new AppError("Student not found", 404);
    res.json({ fullName: name });
  });

  getStudentsByClassName = handleAsync(async (req, res) => {
    const students = await studentRepo.findStudentsByClassName(req.params.className);
    if (!students) throw new AppError("Class not found or no students", 404);
    res.json(students);
  });

  updateStudentById = handleAsync(async (req, res) => {
    const updatedStudent = await studentRepo.updateStudentById(req.params.id, req.body);
    if (!updatedStudent) throw new AppError("Student not found", 404);
    res.json(updatedStudent);
  });

  deleteStudentById = handleAsync(async (req, res) => {
    const deletedStudent = await studentRepo.deleteStudentById(req.params.id);
    if (!deletedStudent) throw new AppError("Student not found", 404);
    res.status(204).send();
  });

  deleteAllStudents = handleAsync(async (_req, res) => {
    await studentRepo.deleteAllStudents();
    res.status(204).send();
  });

  countStudents = handleAsync(async (req, res) => {
    const count = await studentRepo.countStudents(req.params.id);
    if (count === null) throw new AppError("Invalid student ID", 400);
    res.json({ count });
  });

  getAllStudentNames = handleAsync(async (_req, res) => {
    const names = await studentRepo.getAllStudentNames();
    res.json(names);
  });
}
