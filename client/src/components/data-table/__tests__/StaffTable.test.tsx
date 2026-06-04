import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StaffTable from "../StaffTable";
import type { IStaff } from "../../../types/people/StaffTypes";

vi.mock("../../../api/StaffApi", () => ({
  countStaff: vi.fn().mockResolvedValue({ count: 2 }),
}));

const mockStaff: IStaff[] = [
  {
    _id: "s1",
    school: "sch1",
    firstName: "Alice",
    middleName: "M.",
    lastName: "Njeri",
    email: "alice@school.com",
    primaryPhoneNumber: "+254712345678",
    nationality: "Kenyan",
    isActive: true,
    isLocked: false,
    isTwoFactorEnabled: false,
    role: "teacher",
    employeeNumber: "EMP-2026-0001",
  },
  {
    _id: "s2",
    school: "sch1",
    firstName: "Bob",
    middleName: "",
    lastName: "Kip",
    email: "bob@school.com",
    primaryPhoneNumber: "+254798765432",
    nationality: "Kenyan",
    isActive: false,
    isLocked: false,
    isTwoFactorEnabled: false,
    role: "principal",
    employeeNumber: "EMP-2026-0002",
  },
];

describe("StaffTable", () => {
  afterEach(cleanup);

  it("renders empty state", () => {
    render(
      <StaffTable
        staff={[]}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    );
    expect(screen.getByText("Total staff:")).toBeInTheDocument();
  });

  it("renders staff rows with data", () => {
    render(
      <StaffTable
        staff={mockStaff}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    );
    expect(screen.getByText("EMP-2026-0001")).toBeInTheDocument();
    expect(screen.getByText("EMP-2026-0002")).toBeInTheDocument();
    expect(screen.getByText("Alice M. Njeri")).toBeInTheDocument();
    expect(screen.getByText("Bob Kip")).toBeInTheDocument();
  });

  it("renders role badges with correct text", () => {
    render(
      <StaffTable
        staff={mockStaff}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    );
    expect(screen.getByText("teacher")).toBeInTheDocument();
    expect(screen.getByText("principal")).toBeInTheDocument();
  });

  it("displays correct row numbers based on page and limit", () => {
    render(
      <StaffTable
        staff={mockStaff}
        page={2}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    );
    expect(screen.getByText("11")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("calls onEdit when save is clicked after editing", async () => {
    const onEdit = vi.fn();
    const user = userEvent.setup();
    render(
      <StaffTable
        staff={mockStaff}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={onEdit}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />,
    );
    const editButtons = screen.getAllByTitle("Edit");
    await user.click(editButtons[0]);
    const inputs = screen.getAllByRole("textbox");
    await user.clear(inputs[0]);
    await user.type(inputs[0], "Alicia");
    await user.click(screen.getByTitle("Save"));
    expect(onEdit).toHaveBeenCalledWith("s1", expect.objectContaining({ firstName: "Alicia" }));
  });

  it("calls onDelete when delete button is clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <StaffTable
        staff={mockStaff}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={onDelete}
        onToggleStatus={vi.fn()}
      />,
    );
    const deleteButtons = screen.getAllByTitle("Delete");
    await user.click(deleteButtons[0]);
    expect(onDelete).toHaveBeenCalledWith(mockStaff[0]);
  });

  it("calls onToggleStatus when status button is clicked", async () => {
    const onToggleStatus = vi.fn();
    const user = userEvent.setup();
    render(
      <StaffTable
        staff={mockStaff}
        page={1}
        limit={10}
        onSort={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={onToggleStatus}
      />,
    );
    const statusButtons = screen.getAllByText(/Active|Inactive/);
    await user.click(statusButtons[0]);
    expect(onToggleStatus).toHaveBeenCalledWith("s1");
  });
});
