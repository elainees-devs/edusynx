// server/src/controllers/people/student.controller.ts
import { StudentRepository } from "../../repositories";
import { uploadStudentsFromBuffer } from "../../utils";
import { AppError } from "../../utils/AppError";
import { handleAsync } from "../../utils/handleAsync";

const studentRepo = new StudentRepository();

export class StudentController {
  // 1. Create student
  generateAdmissionAndCreateStudent = handleAsync(async (req, res) => {
    const student = await studentRepo.generateAdmissionNumberAndCreateStudent(
      req.body,
    );
    res.status(201).json(student);
  });

  // 2. Get all students
  getAllStudents = handleAsync(async (req, res) => {
    // Get page, limit, and search from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    // Fetch all students from repo
    let allStudents = await studentRepo.findAllStudents();

    // Filter by search if provided
    if (search) {
      const lowerSearch = search.toLowerCase();
      allStudents = allStudents.filter(
        (student) =>
          student.studentFirstName.toLowerCase().includes(lowerSearch) ||
          student.studentLastName.toLowerCase().includes(lowerSearch) ||
          student.adm.toString().includes(lowerSearch),
      );
    }

    const total = allStudents.length;
    const totalPages = Math.ceil(total / limit);

    // Paginate students
    const start = (page - 1) * limit;
    const paginatedStudents = allStudents.slice(start, start + limit);

    // Return paginated response
    res.json({ data: paginatedStudents, search,page, totalPages, total });
  });

  // 3. Get student with guardian
  getStudentWithGuardianById = handleAsync(async (req, res) => {
    const student = await studentRepo.findStudentWithGuardianById(
      req.params.id,
    );
    if (!student) throw new AppError("Student not found", 404);
    res.json(student);
  });

  // 4. Get active students
  getActiveStudents = handleAsync(async (_req, res) => {
    const students = await studentRepo.findActiveStudents();
    res.json(students);
  });

  // 6. Update student
  updateStudentById = handleAsync(async (req, res) => {
    const updatedStudent = await studentRepo.updateStudentById(
      req.params.id,
      req.body,
    );
    if (!updatedStudent) throw new AppError("Student not found", 404);
    res.json(updatedStudent);
  });

  // 7. Delete student
  deleteStudentById = handleAsync(async (req, res) => {
    const deletedStudent = await studentRepo.deleteStudentById(req.params.id);
    if (!deletedStudent) throw new AppError("Student not found", 404);
    res.status(204).send();
  });

  // 8. Delete all students
  deleteAllStudents = handleAsync(async (_req, res) => {
    await studentRepo.deleteAllStudents();
    res.status(204).send();
  });

  // 9. Count students
  countStudents = handleAsync(async (req, res) => {
    const count = await studentRepo.countStudents(req.params.id);
    if (count === null) throw new AppError("Invalid student ID", 400);
    res.json({ count });
  });

  // 10. Get all student names
  getAllStudentNames = handleAsync(async (_req, res) => {
    const names = await studentRepo.getAllStudentNames();
    res.json(names);
  });

  // 11. Upload students (CSV / Excel)
  uploadStudentsData = handleAsync(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { buffer, originalname } = req.file;
    const schoolId = req.body.schoolId || req.params.schoolId;

    if (!schoolId) {
      return res.status(400).json({ message: "School ID is required" });
    }

    const students = await uploadStudentsFromBuffer(
      buffer,
      originalname,
      schoolId,
    );

    res.status(201).json({
      message: `Successfully uploaded ${students.saved} students`,
      students,
    });
  });
}
