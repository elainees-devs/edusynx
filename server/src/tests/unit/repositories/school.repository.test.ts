// server/src/tests/unit/repositories/school.repository.test.ts
import { SchoolRepository } from "../../../repositories/school-core/school.repository";
import { SchoolModel } from "../../../models";
import { mockSchool } from "../repositories/__mocks__/school.mock";

// Mock the SchoolModel methods
jest.mock("../../../models", () => ({
  SchoolModel: jest.fn().mockImplementation(() => ({
    save: jest.fn(),
  })),
}));

jest.mock("../../../utils/slugify", () => ({
  slugify: jest.fn((name: string) => name.toLowerCase().replace(/\s+/g, "-")),
}));

describe("SchoolRepository", () => {
  let repo: SchoolRepository;
  let schoolMock: ReturnType<typeof mockSchool>;

  beforeEach(() => {
    repo = new SchoolRepository();
    schoolMock = mockSchool();
    jest.clearAllMocks();
  });

  // CREATE NEW SCHOOL
  it("should create a new school", async () => {
    // Cast SchoolModel to unknown first, then to jest.Mock
    (SchoolModel as unknown as jest.Mock).mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(schoolMock),
    }));

    const repo = new SchoolRepository();
    const result = await repo.createSchool(schoolMock);

    expect(result).toEqual(schoolMock);
    expect(SchoolModel).toHaveBeenCalledWith(
      expect.objectContaining({
        name: schoolMock.name,
      })
    );
  });

  // UPDATE SCHOOL BY ID

  it("should update school by ID", async () => {
    const findByIdAndUpdateMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(schoolMock),
    });
    (SchoolModel as any).findByIdAndUpdate = findByIdAndUpdateMock;

    const updates = { name: "Updated School" };
    const result = await repo.updateSchoolById("123", updates);

    expect(findByIdAndUpdateMock).toHaveBeenCalledWith("123", updates, {
      new: true,
    });
    expect(result).toEqual(schoolMock);
  });

  // FIND SCHOOL BY ID

  it("should find school by ID", async () => {
    const findByIdMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(schoolMock),
    });
    (SchoolModel as any).findById = findByIdMock;

    const result = await repo.findSchoolById("123");

    expect(findByIdMock).toHaveBeenCalledWith("123");
    expect(result).toEqual(schoolMock);
  });

  // FIND SCHOOL BY SLUG
  it("should find school by slug", async () => {
    const findOneMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(schoolMock),
    });
    (SchoolModel as any).findOne = findOneMock;

    const result = await repo.findBySlug("slug-school");

    expect(findOneMock).toHaveBeenCalledWith({
      slug: "slug-school",
      isActive: true,
    });
    expect(result).toEqual(schoolMock);
  });

  // DELETE SCHOOL BY ID

  it("should delete a school by ID", async () => {
    const findByIdAndDeleteMock = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(schoolMock),
    });
    (SchoolModel as any).findByIdAndDelete = findByIdAndDeleteMock;

    const result = await repo.deleteSchoolById("123");

    expect(findByIdAndDeleteMock).toHaveBeenCalledWith("123");
    expect(result).toEqual(schoolMock);
  });

  // DELETE ALL SCHOOLS

  it("should delete all schools", async () => {
    const deleteManyMock = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(undefined) });
    (SchoolModel as any).deleteMany = deleteManyMock;

    await repo.deleteAllSchools();
    expect(deleteManyMock).toHaveBeenCalledWith({});
  });

  // PAGINATED SCHOOLS
  it("should return paginated schools", async () => {
    const mockSchools = [schoolMock];
    const findMock = jest.fn().mockReturnValue({
      skip: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue(mockSchools),
      }),
    });
    (SchoolModel as any).find = findMock;

    const result = await repo.findMany({ skip: 0, limit: 10 });

    expect(findMock).toHaveBeenCalled();
    expect(result).toEqual(mockSchools);
  });

  // COUNT ALL SCHOOLS
  it("should count all schools", async () => {
    const countDocumentsMock = jest.fn().mockResolvedValue(5);
    (SchoolModel as any).countDocuments = countDocumentsMock;

    const result = await repo.countAll();

    expect(countDocumentsMock).toHaveBeenCalled();
    expect(result).toBe(5);
  });
});
