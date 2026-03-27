import { SubjectAssignmentForm } from "../../components";
import type { Teacher } from "../../types/school/Allocation";


const SubjectAssignment = () => {
  const handleSubmit = (data: { subjectName: string; teacher: Teacher }) => {
    // Handle form submission logic here
    console.log("Form submitted:", data);
  };

  return (
    <div>
     <SubjectAssignmentForm onSubmit={handleSubmit} />
    </div>
  );
};

export default SubjectAssignment;