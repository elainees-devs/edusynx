// server/src/validation/department.schema.ts
import {z} from "zod"

// validate ObjectId as 24 hex characters
const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const createDepartmentSchema = z.object({
    school: objectId,
    departmentName: z.string().min(3)
})

export const updateDepartmentSchema = createDepartmentSchema.partial();