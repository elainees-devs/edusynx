import { StaffModel } from "../../models";
import { CreateStaffDTO, UpdateStaffDTO } from "../../dto";
import { IStaff } from "../../types";

export class StaffRepository {
  async createStaff(data: CreateStaffDTO): Promise<IStaff> {
    const staff = new StaffModel(data);
    return await staff.save();
  }

  async getStaffById(id: string): Promise<IStaff | null> {
    return await StaffModel.findById(id)
      .populate("school")
      .populate("department")
      .populate("assignedClass");
  }

  async getAllStaff(
    schoolId: string,
    filters: {
      role?: string;
      department?: string;
      isActive?: boolean;
      search?: string;
      page?: number;
      limit?: number;
    } = {}
  ): Promise<{ data: IStaff[]; total: number }> {
    const { role, department, isActive, search, page = 1, limit = 20 } = filters;
    const query: any = { school: schoolId };

    if (role) query.role = role;
    if (department) query.department = department;
    if (isActive !== undefined) query.isActive = isActive;

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { middleName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeNumber: { $regex: search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      StaffModel.find(query)
        .populate("department")
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      StaffModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async updateStaff(id: string, data: UpdateStaffDTO): Promise<IStaff | null> {
    return await StaffModel.findByIdAndUpdate(id, data, { new: true })
      .populate("school")
      .populate("department");
  }

  async deleteStaff(id: string): Promise<IStaff | null> {
    return await StaffModel.findByIdAndDelete(id);
  }

  async toggleActive(id: string): Promise<IStaff | null> {
    const staff = await StaffModel.findById(id);
    if (!staff) return null;
    staff.isActive = !staff.isActive;
    return await staff.save();
  }

  async assignDepartment(id: string, departmentId: string): Promise<IStaff | null> {
    return await StaffModel.findByIdAndUpdate(
      id,
      { department: departmentId },
      { new: true }
    ).populate("department");
  }

  async assignPosition(id: string, position: string): Promise<IStaff | null> {
    return await StaffModel.findByIdAndUpdate(
      id,
      { position },
      { new: true }
    );
  }

  async countStaff(schoolId: string): Promise<number> {
    return await StaffModel.countDocuments({ school: schoolId });
  }
}
