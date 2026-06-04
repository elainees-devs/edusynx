import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StaffForm from "../StaffForm";
import type { StaffRole } from "../../../types/people/StaffTypes";

const schoolId = "sch1";

describe("StaffForm", () => {
  afterEach(cleanup);

  it("renders create mode with empty fields", () => {
    render(<StaffForm schoolId={schoolId} onSubmit={vi.fn()} />);
    expect(screen.getByText("Register Staff")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Staff" })).toBeInTheDocument();
  });

  it("renders edit mode with initial values", () => {
    render(
      <StaffForm
        initial={{
          _id: "s1",
          school: schoolId,
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
        }}
        schoolId={schoolId}
        onSubmit={vi.fn()}
      />,
    );
    expect(screen.getByText("Edit Staff")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("shows class-teacher fields when role is teacher in create mode", async () => {
    const user = userEvent.setup();
    render(<StaffForm schoolId={schoolId} onSubmit={vi.fn()} />);
    const roleSelect = screen.getByLabelText("Role");
    await user.selectOptions(roleSelect, "teacher");
    expect(screen.getByText("Class Teacher")).toBeInTheDocument();
    await user.click(screen.getByText("Class Teacher"));
    expect(screen.getByLabelText("Assigned Class")).toBeInTheDocument();
  });

  it("hides class-teacher fields for non-teacher roles", async () => {
    const user = userEvent.setup();
    render(<StaffForm schoolId={schoolId} onSubmit={vi.fn()} />);
    const roleSelect = screen.getByLabelText("Role");
    await user.selectOptions(roleSelect, "principal");
    expect(screen.queryByText("Class Teacher")).not.toBeInTheDocument();
  });

  it("calls onSubmit with correct data in create mode", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<StaffForm schoolId={schoolId} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("First Name"), "Alice");
    await user.type(screen.getByLabelText("Last Name"), "Njeri");
    await user.type(screen.getByLabelText("Email"), "alice@school.com");
    await user.type(screen.getByLabelText("Primary Phone"), "+254712345678");

    const form = screen.getByRole("button", { name: /create staff/i }).closest("form")!;
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        school: schoolId,
        firstName: "Alice",
        lastName: "Njeri",
        email: "alice@school.com",
        primaryPhoneNumber: "+254712345678",
        nationality: "Kenyan",
        role: "teacher",
      }),
    );
  });
});
