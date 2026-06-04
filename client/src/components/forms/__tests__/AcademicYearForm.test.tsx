import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AcademicYearForm from "../AcademicYearForm";
import type { IAcademicYear } from "../../../types/school/AcademicYearTypes";

const defaultSchoolId = "sch1";
const mockInitial: IAcademicYear = {
  _id: "1",
  school: "sch1",
  name: "2026",
  startDate: "2026-01-01T00:00:00.000Z",
  endDate: "2026-12-31T00:00:00.000Z",
  isActive: true,
  terms: [{ name: "Term 1", startDate: "2026-01-01", endDate: "2026-04-30" }],
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
};

describe("AcademicYearForm", () => {
  afterEach(cleanup);

  it("renders create mode with empty fields", () => {
    render(<AcademicYearForm schoolId={defaultSchoolId} onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("Academic Year Name")).toHaveValue("");
    expect(screen.getByRole("button", { name: "Create" })).toBeInTheDocument();
  });

  it("renders edit mode with initial values", () => {
    render(
      <AcademicYearForm
        initial={mockInitial}
        schoolId={defaultSchoolId}
        onSubmit={vi.fn()}
      />
    );

    expect(screen.getByLabelText("Academic Year Name")).toHaveValue("2026");
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("calls onSubmit with correct data in create mode", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(<AcademicYearForm schoolId={defaultSchoolId} onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText("Academic Year Name"), "2027");
    await user.type(screen.getByLabelText("Start Date"), "2027-01-01");
    await user.type(screen.getByLabelText("End Date"), "2027-12-31");

    const form = screen.getByRole("button", { name: /create/i }).closest("form")!;
    fireEvent.submit(form);

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      school: "sch1",
      name: "2027",
      startDate: "2027-01-01",
      endDate: "2027-12-31",
      isActive: false,
      terms: [{ name: "", startDate: "", endDate: "" }],
    });
  });

  it("calls onSubmit with correct data in edit mode", async () => {
    const onSubmit = vi.fn();
    const user = userEvent.setup();
    render(
      <AcademicYearForm
        initial={mockInitial}
        schoolId={defaultSchoolId}
        onSubmit={onSubmit}
      />
    );

    await user.clear(screen.getByLabelText("Academic Year Name"));
    await user.type(screen.getByLabelText("Academic Year Name"), "2026-Updated");
    await user.click(screen.getByRole("button", { name: "Update" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "2026-Updated",
      startDate: "2026-01-01",
      endDate: "2026-12-31",
      isActive: true,
      terms: [{ name: "Term 1", startDate: "2026-01-01", endDate: "2026-04-30" }],
    });
  });

  it("toggles active checkbox", async () => {
    const user = userEvent.setup();
    render(<AcademicYearForm schoolId={defaultSchoolId} onSubmit={vi.fn()} />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("adds and removes term periods", async () => {
    const user = userEvent.setup();
    render(<AcademicYearForm schoolId={defaultSchoolId} onSubmit={vi.fn()} />);

    const termInputs = screen.getAllByPlaceholderText("Term Name");
    expect(termInputs).toHaveLength(1);

    await user.click(screen.getByText("+ Add Term"));
    expect(screen.getAllByPlaceholderText("Term Name")).toHaveLength(2);

    const removeButtons = screen.getAllByRole("button", { name: "Remove" });
    await user.click(removeButtons[0]);
    expect(screen.getAllByPlaceholderText("Term Name")).toHaveLength(1);
  });
});
