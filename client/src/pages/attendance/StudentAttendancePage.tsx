import React, { useState } from "react";
import { Sidebar, Topbar } from "../../shared/layout/dashboard";
import { AttendanceForm } from "../../components";
import { useParams } from "react-router-dom";

const StudentAttendancePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-64 flex-shrink-0">
        <Sidebar role={["school-admin", "principal", "teacher"]} />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar role={["school-admin", "principal", "teacher"]} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Student Attendance</h1>
            <p className="text-gray-600 mt-1">
              Select a class and stream to record or edit attendance.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <AttendanceForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentAttendancePage;
