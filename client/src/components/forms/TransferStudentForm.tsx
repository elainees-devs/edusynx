import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import type { IClass, IStream, Student } from "../../types";
import { getAllClasses, getAllStreams, transferStudent } from "../../api";
import Swal from "sweetalert2";

interface TransferStudentFormProps {
  student: Student;
  onClose: () => void;
  onSuccess: (updated: Student) => void;
}

const TransferStudentForm: React.FC<TransferStudentFormProps> = ({
  student,
  onClose,
  onSuccess,
}) => {
  const [classes, setClasses] = useState<IClass[]>([]);
  const [streams, setStreams] = useState<IStream[]>([]);
  const [targetClassId, setTargetClassId] = useState("");
  const [targetStreamId, setTargetStreamId] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([getAllClasses(), getAllStreams()])
      .then(([cls, str]) => {
        setClasses(cls || []);
        setStreams(str || []);
      })
      .catch(() => {
        setClasses([]);
        setStreams([]);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetClassId) {
      Swal.fire("Error", "Please select a target class", "error");
      return;
    }
    setSubmitting(true);
    try {
      const updated = await transferStudent(
        student._id,
        targetClassId,
        targetStreamId || undefined,
        reason || undefined,
      );
      Swal.fire("Success", "Student transferred", "success");
      onSuccess(updated);
      onClose();
    } catch (err: any) {
      Swal.fire("Error", err?.message || "Transfer failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            Transfer Student: {student.studentFirstName} {student.studentLastName}
          </h2>
          <button type="button" onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="transfer-target-class" className="block text-sm font-medium text-gray-700 mb-1">
              Target Class *
            </label>
            <select
              id="transfer-target-class"
              value={targetClassId}
              onChange={(e) => setTargetClassId(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">-- Select --</option>
              {classes.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.clasName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="transfer-target-stream" className="block text-sm font-medium text-gray-700 mb-1">
              Target Stream
            </label>
            <select
              id="transfer-target-stream"
              value={targetStreamId}
              onChange={(e) => setTargetStreamId(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Keep existing --</option>
              {streams.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.streamName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="transfer-reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason (optional)
            </label>
            <textarea
              id="transfer-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason for transfer"
              className="w-full border rounded px-3 py-2"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? "Transferring..." : "Transfer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransferStudentForm;
