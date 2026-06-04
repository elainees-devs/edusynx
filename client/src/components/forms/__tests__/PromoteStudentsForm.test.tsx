import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PromoteStudentsForm from "../PromoteStudentsForm";

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
  promoteStudents: vi.fn().mockResolvedValue({
    message: "Promoted 25 students",
    modifiedCount: 25,
  }),
}));

describe("PromoteStudentsForm", () => {
  afterEach(cleanup);

  it("renders the form with source and target class selects", async () => {
    render(<PromoteStudentsForm onClose={vi.fn()} onSuccess={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Promote Students")).toBeInTheDocument();
    });
    expect(screen.getByText("Source Class *")).toBeInTheDocument();
    expect(screen.getByText("Target Class *")).toBeInTheDocument();
    expect(screen.getByText("Target Stream")).toBeInTheDocument();
    expect(screen.getByText("Academic Year")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Promote" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<PromoteStudentsForm onClose={onClose} onSuccess={vi.fn()} />);

    await waitFor(() => {
      expect(screen.getByText("Promote Students")).toBeInTheDocument();
    });
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("submits with selected values", async () => {
    const onSuccess = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<PromoteStudentsForm onClose={onClose} onSuccess={onSuccess} />);

    await waitFor(() => {
      expect(screen.getByText("Promote Students")).toBeInTheDocument();
    });

    const sourceSelect = screen.getByLabelText("Source Class *");
    const targetSelect = screen.getByLabelText("Target Class *");

    await user.selectOptions(sourceSelect, "c1");
    await user.selectOptions(targetSelect, "c2");

    const form = screen.getByRole("button", { name: "Promote" }).closest("form")!;
    fireEvent.submit(form);

    await waitFor(() => {
      expect(onSuccess).toHaveBeenCalledTimes(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
