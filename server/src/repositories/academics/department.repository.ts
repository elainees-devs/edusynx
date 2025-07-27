// server/src/repositories/academics/department.repository.ts
import { CreateDepartmentDTO } from "../../dto"
import { DepartmentModel } from "../../models/academics/department.model"
import { IDepartment } from "../../types"

// Repository for managing department-related database operations
export class DepartmentRepository{
    // Add new department
    async createDepartment(departmentData:CreateDepartmentDTO):Promise<IDepartment>{
        const departmentInstance = new DepartmentModel(departmentData)
        return await departmentInstance.save()
}

    // Retrieve department details by ID
    async getDepartmentById(departmentId: string):Promise<IDepartment | null>{
        return await DepartmentModel.findById(departmentId).populate("school")
}

    // Retrieve all departments
    async getAllDepartments(): Promise<IDepartment[]>{
        return await DepartmentModel.find().populate("school")
}

    // Update department details
    async updateDepartment(
        departmentId: string,
        departmentData:Partial<CreateDepartmentDTO>):Promise<IDepartment | null>{
        return await DepartmentModel.findByIdAndUpdate(departmentId, departmentData,{
            new: true,
        }).populate("school")
}

    // Delete department by Id
    async deleteDepartment(departmentId: string): Promise<IDepartment | null>{
        return await DepartmentModel.findByIdAndDelete(departmentId).populate("school")
    }

    // Delete all departments
    async deleteAllDepartments(): Promise<void>{
        await DepartmentModel.deleteMany({})
    }
}