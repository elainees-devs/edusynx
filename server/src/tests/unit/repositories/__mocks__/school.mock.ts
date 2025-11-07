
import { Types } from "mongoose";
import { ISchool } from "../../../../types";

export const mockSchool = (overrides?: Partial<ISchool>): ISchool => ({
  _id: new Types.ObjectId(),
  name: "EduSynx Academy",
  address: "Nairobi, Kenya",
  phoneNumber: "+254712345678",
  email: "info@edusynx.com",
  establishedYear: 2020,
  isActive: true,
  schoolCode: "EDU123",
  role: "school-admin",
  slug: "edusynx-academy",
  accessUrl: "https://edusynx.com/access",
  website: "https://edusynx.com",
  logoUrl: "https://cdn.edusynx.com/logo.png",
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

// Mock request and response objects
export const mockSchoolObj = mockSchool();

export const mockReq = {
  body: { ...mockSchoolObj },
  params: { id: mockSchoolObj._id },
  query: { page: "1", limit: "5" },
} as any;

export const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as any;

export const mockNext = jest.fn();
