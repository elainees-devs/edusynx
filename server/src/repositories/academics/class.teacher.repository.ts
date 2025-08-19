// server/src/repositories/academics/class.teacher.repository.ts
import { CreateClassTeacherDTO } from "../../dto";
import { ClassTeacherModel } from "../../models";
import { IClass, IClassTeacher, IStream } from "../../types";

export class ClassTeacherRepository {
  // 1. Add new department
  async addClassTeacher(
    classTeacherData: CreateClassTeacherDTO
  ): Promise<IClassTeacher> {
    const classTeacher = new ClassTeacherModel(classTeacherData);
    return await classTeacher.save();
  }

  // 2. Get class teacher by Id
  async getClassTeacherById(
    classTeacherId: string
  ): Promise<IClassTeacher | null> {
    return await ClassTeacherModel.findById(classTeacherId).populate("school");
  }

  // 3. Get all class teachers
  async getAllClassTeachers(): Promise<IClassTeacher[]> {
    return await ClassTeacherModel.find().populate("school");
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
