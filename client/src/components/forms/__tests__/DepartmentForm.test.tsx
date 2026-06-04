import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DepartmentForm from "../DepartmentForm";

vi.mock("../../../api/StaffApi", () => ({
  getAllStaff: vi.fn().mockResolvedValue({
    data: [
      { _id: "s1", firstName: "Alice", lastName: "Njeri", employeeNumber: "EMP-001" },
      { _id: "s2", firstName: "Bob", lastName: "Kip", employeeNumber: "EMP-002" },
    ],
    page: 1,
    limit: 999,
    total: 2,
    totalPages: 1,
  }),
}));

const schoolId = "sch1";

describe("DepartmentForm", () => {
  afterEach(cleanup);

  it("renders create mode with empty fields", () => {
    render(<DepartmentForm schoolId={schoolId} onSubmit={vi.fn()} />);
    expect(screen.getByText("Register Department")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create Department" }),
    ).toBeInTheDocument();
  });

  it("renders edit mode with initial values", () => {
    render(
      <DepartmentForm
        initial={{
          _id: "dept-1",
          departmentName: "science",
          school: schoolId,
        }}
        schoolId={schoolId}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByText("Edit Department")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("calls onSubmit with correct data in create mode", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<DepartmentForm schoolId={schoolId} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Department Name"), "Science");

    const form = screen
      .getByRole("button", { name: /create department/i })
      .closest("form")!;
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      school: schoolId,
      departmentName: "Science",
      headOfDepartment: undefined,
    });
  });

  it("populates HoD dropdown with staff list", async () => {
    render(<DepartmentForm schoolId={schoolId} onSubmit={vi.fn()} />);
    const select = screen.getByLabelText("Head of Department");
    expect(select).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("Alice Njeri (EMP-001)")).toBeInTheDocument();
    });
    expect(screen.getByText("Bob Kip (EMP-002)")).toBeInTheDocument();
  });
});
