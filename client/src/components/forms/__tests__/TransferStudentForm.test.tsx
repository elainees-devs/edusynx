import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransferStudentForm from "../TransferStudentForm";
import type { Student } from "../../../types";

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn().mockResolvedValue({ isConfirmed: true }) },
}));

vi.mock("../../../api", () => ({
  getAllClasses: vi.fn().mockResolvedValue([
    { _id: "c1", clasName: "Grade 1" },
    { _id: "c2", clasName: "Grade 2" },
  ]),
  getAllStreams: vi.fn().mockResolvedValue([
    { _id: "s1", streamName: "A" },
    { _id: "s2", streamName: "B" },
  ]),
  transferStudent: vi.fn().mockResolvedValue({
    _id: "stu1",
    studentFirstName: "John",
    classId: "c2",
  }),
}));

const mockStudent: Student = {
  _id: "stu1",
  school: "sch1",
  studentFirstName: "John",
  studentMiddleName: "M",
  studentLastName: "Doe",
  studentGender: "male",
  dateOfBirth: "2010-01-01",
  admissionDate: "2024-09-01",
  classId: "c1",
  stream: "s1",
  status: "Active",
  studentPhotoUrl: "",
  adm: "1001",
};

describe("TransferStudentForm", () => {
  afterEach(cleanup);

  it("renders the form with student name", async () => {
    render(
      <TransferStudentForm
        student={mockStudent}
        onClose={vi.fn()}
        onSuccess={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/Transfer Student: John Doe/)).toBeInTheDocument();
    });
    expect(screen.getByText("Target Class *")).toBeInTheDocument();
    expect(screen.getByText("Target Stream")).toBeInTheDocument();
    expect(screen.getByText("Reason (optional)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Transfer" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <TransferStudentForm
        student={mockStudent}
        onClose={onClose}
        onSuccess={vi.fn()}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/Transfer Student: John Doe/)).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("submits with target class and optional reason", async () => {
    const onSuccess = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(
      <TransferStudentForm
        student={mockStudent}
        onClose={onClose}
        onSuccess={onSuccess}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/Transfer Student: John Doe/)).toBeInTheDocument();
    });

    const targetSelect = screen.getByLabelText("Target Class *");
    await user.selectOptions(targetSelect, "c2");

    const reasonInput = screen.getByPlaceholderText("Reason for transfer");
    await user.type(reasonInput, "Family relocation");

    const form = screen.getByRole("button", { name: "Transfer" }).closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
