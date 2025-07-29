// server/src/models/academics/department.model.ts
import { Schema, model, Types } from "mongoose";
import { IDepartment } from "../../types";


const DepartmentSchema = new Schema<IDepartment>(
  {
    school: {type: Types.ObjectId,ref: "School",required: true},
    departmentName: {type: String,required: true,trim: true,lowercase: true},
    headOfDepartment: {type: Types.ObjectId,ref: "Teacher"},
    teachers: [
      {
        type: Types.ObjectId,
        ref: "Teacher",
      },
    ],
  },
  {
    timestamps: true,
  }
);


//Compound index for optimized filtering by departmentName + headOfDepartment
DepartmentSchema.index({ departmentName: 1, headOfDepartment: 1});

export const DepartmentModel = model<IDepartment>("Department", DepartmentSchema);
