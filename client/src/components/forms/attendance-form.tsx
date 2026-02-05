// client/src/components/forms/attendance-form.tsx
import React, { useEffect, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

import { useClassOptions } from "../../hooks/useClassOptions";
import { createAttendance, getStudentsByClassAndStream } from "../../api";
import type {
  AttendanceStatus,
  IAttendance,
  IStudentAttendance,
  Student,
} from "../../types";

interface AttendanceFormData {
  school: string;
  schoolYear: string;
  stream: string;
  classRef: string;
  date: Date;
  attendance: IStudentAttendance[];
}

const AttendanceForm: React.FC = () => {
  // -------------------------------
  // Get logged-in user
  // -------------------------------
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const schoolId = user?.school?._id || "";

  const { streamOptions, classOptions, error: classError } = useClassOptions();
  const [students, setStudents] = useState<Student[]>([]);

  const { control, register, handleSubmit, watch, reset } =
    useForm<AttendanceFormData>({
      defaultValues: {
        school: schoolId,
        schoolYear: "",
        stream: "",
        classRef: "",
        date: new Date(),
        attendance: [],
      },
    });

  const selectedClass = watch("classRef");
  const selectedStream = watch("stream");

  const { fields } = useFieldArray({
    control,
    name: "attendance",
  });

  // -------------------------------
  // Fetch students when class + stream changes
  // -------------------------------
  useEffect(() => {
    if (!selectedClass || !selectedStream) {
      setStudents([]);
      reset((prev) => ({ ...prev, attendance: [] }));
      return;
    }

    const fetchStudents = async () => {
      try {
        const foundStudents = await getStudentsByClassAndStream(
          selectedClass,
          selectedStream,
        );

        setStudents(foundStudents);

        // Only reset attendance, keep other form fields
        reset((prev) => ({
          ...prev,
          attendance: foundStudents.map((stu: Student) => ({
            studentId: stu._id,
            status: "present" as AttendanceStatus,
            name: `${stu.studentFirstName} ${stu.studentLastName}`,
          })),
        }));
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Error fetching students",
          text: (err as Error).message || "Could not load students.",
        });
      }
    };

    fetchStudents();
  }, [selectedClass, selectedStream, reset]);

  // -------------------------------
  // Submit
  // -------------------------------
  const onSubmit = async (data: AttendanceFormData) => {
    // Log attendance array
  console.log("Attendance data being submitted:", data.attendance);
    if (!data.attendance || data.attendance.length === 0) {
    Swal.fire({
      icon: "error",
      title: "No students",
      text: "Please select a class and stream to load students before submitting.",
    });
    return;
  }
    try {
      const schoolYear = data.date.getFullYear().toString(); // Extract year
      const payload: IAttendance = {
        school: data.school,
        schoolYear: schoolYear,
        classRef: data.classRef,
        stream: data.stream,
        date: data.date.toISOString(),
        attendance: data.attendance.map((a) => ({
          studentId: a.studentId,
          name: a.name,
          status: a.status,
        })),
      };

      console.log("Submitting attendance payload:", payload);

      await createAttendance(payload);

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Attendance saved successfully!",
      });
    } catch {
      Swal.fire({
        icon: "error",
        title: "Error saving attendance",
        text: "Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Record Attendance</h2>

      {classError && <p className="text-red-500">{classError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Stream */}
        <div>
          <label className="block font-medium">Stream</label>
          <select {...register("stream", { required: true })} className="input">
            <option value="">Select Stream</option>
            {streamOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Class */}
        <div>
          <label className="block font-medium">Class</label>
          <select
            {...register("classRef", { required: true })}
            className="input"
          >
            <option value="">Select Class</option>
            {classOptions.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block font-medium">Date</label>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={(date: Date | null) => field.onChange(date)}
                dateFormat="yyyy-MM-dd"
                className="border p-2 rounded w-full"
              />
            )}
          />
        </div>

        {/* Attendance Table */}
        {students.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Students</h3>

            <table className="w-full border-collapse border rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">#</th>
                  <th className="border p-2">Student Name</th>
                  <th className="border p-2 text-center">Present</th>
                  <th className="border p-2 text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">
                      {students[index]?.studentFirstName}{" "}
                      {students[index]?.studentLastName}
                    </td>

                    {/* Present checkbox */}
                    <td className="border p-2 text-center">
                      <Controller
                        control={control}
                        name={`attendance.${index}.status`}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value === "present"}
                            onChange={(e) =>
                              field.onChange(
                                e.target.checked ? "present" : "absent",
                              )
                            }
                          />
                        )}
                      />
                    </td>

                    {/* Status dropdown */}
                    <td className="border p-2 text-center">
                      <Controller
                        control={control}
                        name={`attendance.${index}.status`}
                        render={({ field }) => (
                          <select {...field} className="border p-1 rounded">
                            <option value="present">Present</option>
                            <option value="absent">Absent</option>
                            <option value="late">Late</option>
                            <option value="excused">Excused</option>
                          </select>
                        )}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={students.length === 0} // disable until attendance array exists
        >
          Save Attendance
        </button>
      </form>
    </div>
  );
};

export default AttendanceForm;
