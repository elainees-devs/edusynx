import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StudentTable from "../StudentTable";
import type { Student } from "../../../types";

vi.mock("../../../api", () => ({
  getAllClasses: vi.fn().mockResolvedValue([
    { _id: "c1", clasName: "Grade 1" },
  ]),
  getAllStreams: vi.fn().mockResolvedValue([
    { _id: "s1", streamName: "A" },
  ]),
  countStudents: vi.fn().mockResolvedValue({ count: 3 }),
}));

const mockStudents: Student[] = [
  {
    _id: "s1",
    school: "sch1",
    studentFirstName: "Alice",
    studentMiddleName: "",
    studentLastName: "Smith",
    studentGender: "female",
    dateOfBirth: "2010-05-01",
    admissionDate: "2024-09-01",
    classId: "c1",
    stream: "s1",
    status: "Active",
    studentPhotoUrl: "",
    adm: "1001",
    history: [],
  },
  {
    _id: "s2",
    school: "sch1",
    studentFirstName: "Bob",
    studentMiddleName: "",
    studentLastName: "Jones",
    studentGender: "male",
    dateOfBirth: "2010-03-01",
    admissionDate: "2024-09-01",
    classId: "c1",
    stream: "s1",
    status: "Graduated",
    studentPhotoUrl: "",
    adm: "1002",
    history: [],
  },
  {
    _id: "s3",
    school: "sch1",
    studentFirstName: "Charlie",
    studentMiddleName: "",
    studentLastName: "Brown",
    studentGender: "male",
    dateOfBirth: "2010-07-01",
    admissionDate: "2024-09-01",
    classId: "c1",
    stream: "s1",
    status: "Inactive",
    studentPhotoUrl: "",
    adm: "1003",
    history: [],
  },
];

describe("StudentTable", () => {
  afterEach(cleanup);

  it("renders empty state", () => {
    render(
      <StudentTable
        students={[]}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={vi.fn()}
        page={1}
        limit={10}
      />,
    );
    expect(screen.getByText("No students found.")).toBeInTheDocument();
  });

  it("renders student rows with data", async () => {
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={vi.fn()}
        page={1}
        limit={10}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Alice")).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
      expect(screen.getByText("Charlie")).toBeInTheDocument();
    });
  });

  it("displays status badges with correct text", async () => {
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={vi.fn()}
        page={1}
        limit={10}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Graduated")).toBeInTheDocument();
      expect(screen.getByText("Inactive")).toBeInTheDocument();
    });
  });

  it("selects all when header checkbox is clicked", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={onSelectionChange}
        page={1}
        limit={10}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(onSelectionChange).toHaveBeenCalledWith(["s1", "s2", "s3"]);
  });

  it("deselects all when header checkbox is clicked while all selected", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={["s1", "s2", "s3"]}
        onSelectionChange={onSelectionChange}
        page={1}
        limit={10}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(onSelectionChange).toHaveBeenCalledWith([]);
  });

  it("toggles individual student checkbox", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={onSelectionChange}
        page={1}
        limit={10}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    expect(onSelectionChange).toHaveBeenCalledWith(["s1"]);
  });

  it("removes student from selection when unchecked", async () => {
    const onSelectionChange = vi.fn();
    const user = userEvent.setup();
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={["s1", "s2", "s3"]}
        onSelectionChange={onSelectionChange}
        page={1}
        limit={10}
      />,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]);

    expect(onSelectionChange).toHaveBeenCalledWith(["s2", "s3"]);
  });

  it("calls onTransfer when transfer button is clicked", async () => {
    const onTransfer = vi.fn();
    const user = userEvent.setup();
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={onTransfer}
        selectedIds={[]}
        onSelectionChange={vi.fn()}
        page={1}
        limit={10}
      />,
    );

    const transferButtons = screen.getAllByTitle("Transfer Student");
    await user.click(transferButtons[0]);

    expect(onTransfer).toHaveBeenCalledWith(mockStudents[0]);
  });

  it("renders correct row numbers based on page and limit", async () => {
    render(
      <StudentTable
        students={mockStudents}
        onSort={vi.fn()}
        onAdd={vi.fn()}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onTransfer={vi.fn()}
        selectedIds={[]}
        onSelectionChange={vi.fn()}
        page={3}
        limit={10}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText("21")).toBeInTheDocument();
      expect(screen.getByText("22")).toBeInTheDocument();
      expect(screen.getByText("23")).toBeInTheDocument();
    });
  });
});
