import { SubjectAssignmentForm } from "../../components";
import type { Teacher } from "../../types/school/Allocation";
import type { IClass, IStream } from "../../types/school/SchoolCoreTypes";
import { registerTeacherSubjectAllocation } from "../../api/SubjectAssignmentApi";
import { useGlobalState } from "../../hooks/useGlobalContext";
import { getSchoolId } from "../../utils/GetSchoolId";

const SubjectAssignment = () => {
  const { state } = useGlobalState();
  const user = state.loggedInUser as { role: string; school?: string | { _id: string; isActive: boolean } } | undefined;
  const schoolId = getSchoolId(user);

  const handleSubmit = async (data: { subjectName: string; teacher: Teacher; clas: IClass | undefined; stream: IStream | undefined }) => {
    try {
      if (!schoolId) {
        alert("Unable to determine school ID. Please log in again or contact support.");
        return;
      }
      await registerTeacherSubjectAllocation({
        schoolId,
        allocation: {
          teacher: data.teacher._id,
          subject: data.subjectName,
          clasName: data.clas?.clasName || "",
          stream: data.stream?.streamName || "",
        },
      });
      // Optionally show success message or refresh data
      alert("Subject assigned successfully!");
    } catch {
      alert("Failed to assign subject. Please try again.");
    }
  };

  return (
    <div>
      <SubjectAssignmentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SubjectAssignment;