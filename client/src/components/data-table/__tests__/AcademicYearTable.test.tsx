import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AcademicYearTable from "../AcademicYearTable";
import type { IAcademicYear } from "../../../types/school/AcademicYearTypes";

const mockData: IAcademicYear[] = [
  {
    _id: "1",
    school: "sch1",
    name: "2026",
    startDate: "2026-01-01T00:00:00.000Z",
    endDate: "2026-12-31T00:00:00.000Z",
    isActive: true,
    terms: [
      { name: "Term 1", startDate: "2026-01-01", endDate: "2026-04-30" },
      { name: "Term 2", startDate: "2026-05-01", endDate: "2026-08-31" },
    ],
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    _id: "2",
    school: "sch1",
    name: "2025",
    startDate: "2025-01-01T00:00:00.000Z",
    endDate: "2025-12-31T00:00:00.000Z",
    isActive: false,
    terms: [],
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
];

describe("AcademicYearTable", () => {
  afterEach(cleanup);

  it("renders empty state when no data", () => {
    render(
      <AcademicYearTable data={[]} onEdit={vi.fn()} onDelete={vi.fn()} page={1} limit={10} />
    );
    expect(screen.getByText("No academic years found.")).toBeInTheDocument();
  });

  it("renders rows with correct data", () => {
    render(
      <AcademicYearTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} page={1} limit={10} />
    );
    expect(screen.getByText("2026")).toBeInTheDocument();
    expect(screen.getByText("2025")).toBeInTheDocument();
    const termsCells = screen.getAllByText("2");
    expect(termsCells.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("shows Active badge for active years", () => {
    render(
      <AcademicYearTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} page={1} limit={10} />
    );
    const activeBadges = screen.getAllByText("Active");
    expect(activeBadges.length).toBeGreaterThanOrEqual(1);
    const inactiveBadges = screen.getAllByText("Inactive");
    expect(inactiveBadges.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    render(
      <AcademicYearTable data={mockData} onEdit={onEdit} onDelete={vi.fn()} page={1} limit={10} />
    );
    const editButtons = screen.getAllByTitle("Edit");
    await user.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(mockData[0]);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <AcademicYearTable data={mockData} onDelete={onDelete} onEdit={vi.fn()} page={1} limit={10} />
    );
    const deleteButtons = screen.getAllByTitle("Delete");
    await user.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith("2");
  });

  it("renders correct row numbers based on page and limit", () => {
    render(
      <AcademicYearTable data={mockData} onEdit={vi.fn()} onDelete={vi.fn()} page={3} limit={10} />
    );
    // With page=3, limit=10, first row has # = (3-1)*10 + 1 = 21
    expect(screen.getByText("21")).toBeInTheDocument();
    expect(screen.getByText("22")).toBeInTheDocument();
  });
});
