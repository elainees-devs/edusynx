// client/src/components/forms/attendance-form.tsx
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import { useClassOptions } from "../../hooks/useClassOptions";
import { getStudentsByClassAndStream } from "../../api";
import { attendanceApi } from "../../api/attendance.api";
import { AttendanceStatus} from "../../types/school/attendance.types";
import type { IAttendance } from "../../types/school/attendance.types";

interface AttendanceEntry {
  studentId: string | { _id: string; studentFirstName: string; studentLastName: string };
  status: AttendanceStatus;
}

interface Student {
  _id: string;
  studentFirstName: string;
  studentLastName: string;
}

interface AttendanceFormData {
  school: string;
  schoolYear: string;
  streamId: string;
  classRef: string;
  date: Date;
  attendance: {
    studentId: string;
    name: string;
    status: AttendanceStatus;
  }[];
}

const AttendanceForm: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const schoolId = user?.school?._id || "";
  
  const { streamOptions, classOptions, error: classError } = useClassOptions();
  const [existingId, setExistingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { control, register, handleSubmit, watch, setValue } =
    useForm<AttendanceFormData>({
      defaultValues: {
        school: schoolId,
        schoolYear: new Date().getFullYear().toString(),
        streamId: "",
        classRef: "",
        date: new Date(),
        attendance: [],
      },
    });

  const selectedClass = watch("classRef");
  const selectedStream = watch("streamId");
  const selectedDate = watch("date");

  const { fields } = useFieldArray({
    control,
    name: "attendance",
  });

  // -----------------------------------------------------------------
  // Sync Logic: Fetch existing record OR load fresh student list
  // -----------------------------------------------------------------
  useEffect(() => {
    if (!selectedClass || !selectedStream || !selectedDate) return;

    const syncAttendanceData = async () => {
      setLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split("T")[0];
        
        // 1. Check if record exists for this day
        const response = await attendanceApi.getAttendanceByClassAndDate(
          selectedClass,
          selectedStream,
          dateStr
        );

        if (response.data) {
          // RECORD EXISTS: Load it for editing
          setExistingId(response.data._id || null);
          const mappedAttendance = response.data.attendance.map((entry: AttendanceEntry) => ({
            studentId: typeof entry.studentId === "string" ? entry.studentId : entry.studentId._id,
            name: typeof entry.studentId === "string" 
              ? "Student" 
              : `${entry.studentId.studentFirstName} ${entry.studentId.studentLastName}`,
            status: entry.status,
          }));
          setValue("attendance", mappedAttendance);
        } else {
          // NO RECORD: Load fresh student list
          setExistingId(null);
          const students = await getStudentsByClassAndStream(selectedClass, selectedStream);
          const freshAttendance = students.map((stu: Student) => ({
            studentId: stu._id,
            name: `${stu.studentFirstName} ${stu.studentLastName}`,
            status: AttendanceStatus.PRESENT,
          }));
          setValue("attendance", freshAttendance);
        }
      } catch (err) {
        console.error("Sync error:", err);
      } finally {
        setLoading(false);
      }
    };

    syncAttendanceData();
  }, [selectedClass, selectedStream, selectedDate, setValue]);

  const onSubmit = async (data: AttendanceFormData) => {
    if (!data.attendance || data.attendance.length === 0) {
      Swal.fire("Error", "No students loaded for this class.", "error");
      return;
    }

    try {
      const payload: Partial<IAttendance> = {
        school: data.school,
        schoolYear: data.date.getFullYear().toString(),
        classRef: data.classRef,
        streamId: data.streamId,
        date: data.date.toISOString(),
        attendance: data.attendance.map((a) => ({
          studentId: a.studentId,
          status: a.status,
        })),
      };

      if (existingId) {
        // Update existing record
        await attendanceApi.updateFullAttendance(existingId, payload.attendance as Array<{ studentId: string; status: AttendanceStatus }>);
      } else {
        // Create new record
        await attendanceApi.createAttendance(payload);
      }

      Swal.fire("Success", `Attendance ${existingId ? 'updated' : 'saved'} successfully!`, "success");
    } catch  {
      Swal.fire("Error", "Could not save attendance. Please try again.", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white border rounded-xl shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Record Attendance</h2>
        <p className="text-gray-500 text-sm">Select class details to {existingId ? 'update' : 'record'} student status.</p>
      </div>

      {classError && <p className="text-red-500 mb-4">{classError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Stream</label>
            <select {...register("streamId", { required: true })} className="w-full border p-2 rounded-lg">
              <option value="">Select Stream</option>
              {streamOptions.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Class</label>
            <select {...register("classRef", { required: true })} className="w-full border p-2 rounded-lg">
              <option value="">Select Class</option>
              {classOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-1">Date</label>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  selected={field.value}
                  onChange={(date: Date | null) => field.onChange(date)}
                  dateFormat="yyyy-MM-dd"
                  className="w-full border p-2 rounded-lg"
                />
              )}
            />
          </div>
        </div>

        {loading ? (
          <div className="py-10 text-center text-blue-600 font-medium">Syncing data...</div>
        ) : fields.length > 0 && (
          <div className="mt-6 border rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 border-b text-sm font-bold text-gray-600 w-12">#</th>
                  <th className="p-3 border-b text-sm font-bold text-gray-600">Student Name</th>
                  <th className="p-3 border-b text-sm font-bold text-gray-600 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {fields.map((field, index) => (
                  <tr key={field.id} className="hover:bg-gray-50">
                    <td className="p-3 text-sm text-gray-500">{index + 1}</td>
                    <td className="p-3 text-sm font-medium text-gray-800">{field.name}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        {Object.values(AttendanceStatus).map((status) => (
                          <Controller
                            key={status}
                            control={control}
                            name={`attendance.${index}.status`}
                            render={({ field: statusField }) => (
                              <button
                                type="button"
                                onClick={() => statusField.onChange(status)}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase transition-all ${
                                  statusField.value === status 
                                    ? getStatusColor(status) 
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                {status}
                              </button>
                            )}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="submit"
          disabled={fields.length === 0 || loading}
          className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
        >
          {existingId ? 'Update Attendance' : 'Save Attendance'}
        </button>
      </form>
    </div>
  );
};

// Helper for UI colors
const getStatusColor = (status: string) => {
  switch (status) {
    case 'present': return "bg-green-600 text-white shadow-md";
    case 'absent': return "bg-red-600 text-white shadow-md";
    case 'late': return "bg-yellow-500 text-white shadow-md";
    case 'excused': return "bg-blue-600 text-white shadow-md";
    default: return "bg-gray-600 text-white";
  }
};

export default AttendanceForm;