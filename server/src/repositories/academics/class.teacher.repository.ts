// server/src/repositories/academics/class.teacher.repository.ts
import { CreateClassTeacherDTO } from "../../dto";
import { ClassTeacherModel } from "../../models";
import { IBaseUser, IClass, IClassTeacher, IStream, ITeacher } from "../../types";

export class ClassTeacherRepository {
  // 1. Add new department
  async addClassTeacher(
    classTeacherData: CreateClassTeacherDTO
  ): Promise<IClassTeacher> {
    const classTeacher = new ClassTeacherModel(classTeacherData);
    return await classTeacher.save();
  }

// 2. Get class teacher full name by ID
async getClassTeacherById(id: string): Promise<string | null> {
  if (!id) return null;

  const teacher = await ClassTeacherModel.findById(id).populate("school");
  return teacher
    ? `${teacher.firstName} ${teacher.middleName ?? ""} ${teacher.lastName}`.trim()
    : null;
}


// 3. Get all class teachers
async getAllClassTeachers() {
  const classTeachers = await ClassTeacherModel.find()
  .populate({
      path: "teacher",
      select: "firstName middleName lastName", 
      model: "User" 
    })
   .populate({
    path:"grade",
    select:"grade",
    model: "Class"
  
  })
    .populate("stream");
  
  // Debug: Check which teachers are not populating
  classTeachers.forEach(ct => {
    if (ct.teacher === null && ct.teacherId) {
      console.log(`Teacher reference exists but populate failed for ID: ${ct.teacherId}`);
      console.log(`ClassTeacher ID: ${ct._id}`);
    }
  });
  
  return classTeachers;
}
  // 4. Update class teacher by Id
  async updateClassTeacher(
    classTeacherId: string,
    classTeacherData: Partial<CreateClassTeacherDTO>
  ): Promise<IClassTeacher | null> {
    return await ClassTeacherModel.findByIdAndUpdate(
      classTeacherId,
      classTeacherData,
      {
        new: true,
      }
    ).populate("school");
  }

  // 5. Delete class teacher by Id
  async deleteClassTeacher(
    classTeacherId: string
  ): Promise<IClassTeacher | null> {
    return await ClassTeacherModel.findByIdAndDelete(classTeacherId).populate(
      "school"
    );
  }
  // 6. Delete all class teachers

  async deleteAllClassTeachers(): Promise<void> {
    await ClassTeacherModel.deleteMany({});
  }

  // 7. Count total students in each class
  async countTotalStudentsPerClass(): Promise<
    {
      grade: string | IClass;
      stream: string | IStream;
      totalStudents: number;
    }[]
  > {
    const result = await ClassTeacherModel.aggregate([
      {
        $group: {
          _id: { grade: "$grade", stream: "$stream" },
          totalStudents: { $sum: "$totalStudents" },
        },
      },
      {
        $project: {
          _id: 0,
          grade: "$_id.grade",
          stream: "$_id.stream",
          totalStudents: 1,
        },
      },
    ]);

    return result;
  }

  }

