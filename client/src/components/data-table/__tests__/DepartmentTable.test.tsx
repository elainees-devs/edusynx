import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepartmentTable from "../DepartmentTable";
import type { IDepartment } from "../../../types/school/AcademicTypes";

const mockDepartments: IDepartment[] = [
  {
    _id: "dept-1",
    departmentName: "science",
    school: "sch1",
    headOfDepartment: {
      _id: "staff-1",
      firstName: "Alice",
      middleName: "M.",
      lastName: "Njeri",
    },
  },
  {
    _id: "dept-2",
    departmentName: "mathematics",
    school: "sch1",
    teachers: [{ _id: "staff-2", firstName: "Bob", lastName: "Kip" }],
  },
];

describe("DepartmentTable", () => {
  afterEach(cleanup);

  it("renders empty state", () => {
    render(
      <DepartmentTable
        departments={[]}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("No departments found.")).toBeInTheDocument();
  });

  it("renders department rows with data", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("science")).toBeInTheDocument();
    expect(screen.getByText("mathematics")).toBeInTheDocument();
  });

  it("displays head of department name when populated", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    expect(screen.getByText("Alice M. Njeri")).toBeInTheDocument();
  });

  it("shows member count from teachers array", () => {
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    );
    const ones = screen.getAllByText("1");
    expect(ones.length).toBeGreaterThanOrEqual(1);
  });

  it("calls onEdit when edit button is clicked", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={onEdit}
        onDelete={vi.fn()}
      />,
    );
    const editButtons = screen.getAllByTitle("Edit");
    await user.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith(mockDepartments[0]);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <DepartmentTable
        departments={mockDepartments}
        onEdit={vi.fn()}
        onDelete={onDelete}
      />,
    );
    const deleteButtons = screen.getAllByTitle("Delete");
    await user.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith("dept-1");
  });
});
