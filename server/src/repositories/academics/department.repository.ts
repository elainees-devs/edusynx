// server/src/repositories/academics/department.repository.ts
import { CreateDepartmentDTO } from "../../dto"
import { DepartmentModel } from "../../models/academics/department.model"
import { IDepartment } from "../../types"

// Repository for managing department-related database operations
export class DepartmentRepository{
    async createDepartment(departmentData: CreateDepartmentDTO): Promise<IDepartment> {
        const department = await DepartmentModel.create(departmentData);
        return await department.populate(["school", "headOfDepartment", "teachers"]);
    }

    async getDepartmentById(departmentId: string): Promise<IDepartment | null> {
        return await DepartmentModel.findById(departmentId)
            .populate(["school", "headOfDepartment", "teachers"]);
    }

    async getAllDepartments(schoolId?: string): Promise<IDepartment[]> {
        const filter = schoolId ? { school: schoolId } : {};
        return await DepartmentModel.find(filter)
            .populate(["school", "headOfDepartment", "teachers"]);
    }

    async updateDepartment(
        departmentId: string,
        departmentData: Partial<CreateDepartmentDTO>
    ): Promise<IDepartment | null> {
        return await DepartmentModel.findByIdAndUpdate(departmentId, departmentData, {
            new: true,
        }).populate(["school", "headOfDepartment", "teachers"]);
    }

    async deleteDepartment(departmentId: string): Promise<IDepartment | null> {
        return await DepartmentModel.findByIdAndDelete(departmentId);
    }

    // Delete all departments
    async deleteAllDepartments(): Promise<void>{
        await DepartmentModel.deleteMany({})
    }
}