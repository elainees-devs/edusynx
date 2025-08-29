// server/src/controllers/people/student.controller.ts
import { StudentRepository } from "../../repositories";
import { AppError } from "../../utils/AppError";
import { handleAsync } from "../../utils/handleAsync";


const studentRepo = new StudentRepository();

export class StudentController {
  // 1. Method to generate admission number and create a student
generateAdmissionAndCreateStudent = handleAsync(async (req, res) => {
  const student = await studentRepo.generateAdmissionNumberAndCreateStudent(req.body);
  res.status(201).json(student);
});

// 2. Method to get all students
  getAllStudents = handleAsync(async (_req, res) => {
    const students = await studentRepo.findAllStudents();
    res.json(students);
  });

  // 3. Method to get a student with guardian by ID
  getStudentWithGuardianById = handleAsync(async (req, res) => {
    const student = await studentRepo.findStudentWithGuardianById(req.params.id);
    if (!student) throw new AppError("Student not found", 404);
    res.json(student);
  });

  // // 4. Method to get a student's full name by ID
  // getStudentNameById = handleAsync(async (req, res) => {
  //   const name = await studentRepo.findStudentNameById(req.params.id);
  //   if (!name) throw new AppError("Student not found", 404);
  //   res.json({ fullName: name });
  // });

  // 4. Method to get all active students
getActiveStudents = handleAsync(async (_req, res) => {
  const students = await studentRepo.findActiveStudents();
  res.json(students);
});


  // 5. Method to get students by class name
  getStudentsByClassName = handleAsync(async (req, res) => {
    const students = await studentRepo.findStudentsByClassName(req.params.className);
    if (!students) throw new AppError("Class not found or no students", 404);
    res.json(students);
  });

  // 6. Method to update a student by ID
  updateStudentById = handleAsync(async (req, res) => {
    const updatedStudent = await studentRepo.updateStudentById(req.params.id, req.body);
    if (!updatedStudent) throw new AppError("Student not found", 404);
    res.json(updatedStudent);
  });

  // 7. Method to delete a student by ID

  deleteStudentById = handleAsync(async (req, res) => {
    const deletedStudent = await studentRepo.deleteStudentById(req.params.id);
    if (!deletedStudent) throw new AppError("Student not found", 404);
    res.status(204).send();
  });

  // 8. Method to delete all students
  deleteAllStudents = handleAsync(async (_req, res) => {
    await studentRepo.deleteAllStudents();
    res.status(204).send();
  });

  // 9. Method to count students
  countStudents = handleAsync(async (req, res) => {
    const count = await studentRepo.countStudents(req.params.id);
    if (count === null) throw new AppError("Invalid student ID", 400);
    res.json({ count });
  });

  // 10. Method to get all student names
  getAllStudentNames = handleAsync(async (_req, res) => {
    const names = await studentRepo.getAllStudentNames();
    res.json(names);
  });
}
